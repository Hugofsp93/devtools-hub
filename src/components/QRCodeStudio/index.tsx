import { useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Layout from '../../components/Layout';
import { QRCodeData, QRCodeStyle, CONTENT_VALIDATORS, formatContent } from './types';
import QRCodeCustomization from './QRCodeCustomization';
import { usePersistedState } from '../../utils/usePersistedState';
import html2canvas from 'html2canvas';
const QRCodeStudio = () => {
  const [qrData, setQrData] = usePersistedState<QRCodeData>('qrcode-data', {
    content: '',
    type: 'url'
  });

  const [qrStyle, setQrStyle] = usePersistedState<QRCodeStyle>('qrcode-style', {
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    size: 256,
    includeMargin: true,
    level: 'M'
  });

  const [validation, setValidation] = usePersistedState<{ isValid: boolean; error?: string }>('qrcode-validation', { isValid: true });
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQrStyle(prev => ({
      ...prev,
      level: prev.logo ? 'H' : 'M'
    }));
  }, [qrStyle.logo, setQrStyle]);

  const handleContentChange = (content: string) => {
    setQrData(prev => ({ ...prev, content }));
    const validation = CONTENT_VALIDATORS[qrData.type](content);
    setValidation(validation);
  };

  const handleTypeChange = (type: QRCodeData['type']) => {
    setQrData(prev => ({ ...prev, type }));
    const validation = CONTENT_VALIDATORS[type](qrData.content);
    setValidation(validation);
  };

  const handleDownload = async () => {
    if (!qrRef.current) return;

    try {
      const canvas = await html2canvas(qrRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  const formattedContent = qrData.content ? formatContent(qrData.type, qrData.content) : '';

  return (
    <Layout>
      <div className="w-full flex flex-col items-center gap-12">
        <div className="relative flex flex-col items-center gap-6 pb-10">
          <h1 className="relative text-center text-4xl leading-[125%] font-bold text-icon-950 dark:text-icon-50">
            QR Code Studio
          </h1>
          <span className="inline-flex flex-col items-center justify-center gap-2.5 text-center">
            <span className="inline text-xl text-icon-600 dark:text-icon-200">
              Generate and customize QR codes with various styles
            </span>
          </span>
        </div>
        <div className="w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-icon-950 dark:text-icon-100 mb-1">QR Code Type</label>
                  <select
                    className="w-full p-2 border rounded-lg bg-icon-50 dark:bg-gray-900 text-icon-950 dark:text-icon-50 border-icon-200 dark:border-icon-700 focus:ring-1 focus:ring-icon-400 outline-none transition"
                    value={qrData.type}
                    onChange={(e) => handleTypeChange(e.target.value as QRCodeData['type'])}
                  >
                    <option value="url">URL</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="sms">SMS</option>
                    <option value="wifi">WiFi</option>
                  </select>
                </div>

                <div className="mb-10">
                  <label className="block text-xs font-semibold text-icon-950 dark:text-icon-100 mb-1">Content</label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded-lg bg-icon-50 dark:bg-gray-900 text-icon-950 dark:text-icon-50 border-icon-200 dark:border-icon-700 focus:ring-1 focus:ring-icon-400 outline-none transition ${
                      !validation.isValid ? 'border-red-500' : ''
                    }`}
                    value={qrData.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder={`Enter ${qrData.type} content`}
                  />
                  {!validation.isValid && (
                    <p className="absolute text-sm mt-1 text-red-500">{validation.error}</p>
                  )}
                </div>
              </div>

              <QRCodeCustomization
                style={qrStyle}
                onStyleChange={setQrStyle}
                qrRef={qrRef}
              />
            </div>

            <div className="flex items-center justify-center">
              {qrData.content && validation.isValid ? (
                <div className="flex flex-col gap-4">
                  <div ref={qrRef} className="flex justify-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                    <div className="relative">
                      <QRCodeSVG
                        value={formattedContent}
                        size={qrStyle.size}
                        fgColor={qrStyle.fgColor}
                        bgColor={qrStyle.bgColor}
                        marginSize={qrStyle.includeMargin}
                        level={qrStyle.level}
                      />
                      {qrStyle.logo && (
                        <div 
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          style={{ backgroundColor: qrStyle.bgColor }}
                        >
                          <img
                            src={qrStyle.logo}
                            alt="QR Code Logo"
                            className="w-12 h-12 object-contain rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="min-w-[90px] px-4 py-2 rounded-lg font-semibold transition bg-primary-500 text-icon-50 hover:bg-primary-400 focus:ring-1 focus:ring-primary-400 outline-none relative text-center"
                      onClick={handleDownload}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Enter content to generate QR code</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QRCodeStudio; 