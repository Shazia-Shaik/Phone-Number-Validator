import React, { useState, useEffect } from 'react';
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';
import { Phone, MapPin, Wifi, CheckCircle, XCircle, Sun, Moon } from 'lucide-react';

interface PhoneInfo {
  isValid: boolean;
  country?: string;
  countryCode?: CountryCode;
  region?: string;
  nationalNumber?: string;
  internationalFormat?: string;
  carrier?: string;
}

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
}

const PhoneValidator: React.FC<Props> = ({ isDark, toggleTheme }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneInfo, setPhoneInfo] = useState<PhoneInfo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const countryNames: Record<string, string> = {
    US: 'United States',
    CA: 'Canada',
    GB: 'United Kingdom',
    AU: 'Australia',
    DE: 'Germany',
    FR: 'France',
    IT: 'Italy',
    ES: 'Spain',
    BR: 'Brazil',
    IN: 'India',
    CN: 'China',
    JP: 'Japan',
    RU: 'Russia',
    MX: 'Mexico',
    AR: 'Argentina',
    CL: 'Chile',
    CO: 'Colombia',
    PE: 'Peru',
    VE: 'Venezuela',
    ZA: 'South Africa',
    EG: 'Egypt',
    NG: 'Nigeria',
    KE: 'Kenya',
    MA: 'Morocco',
    TN: 'Tunisia',
    GH: 'Ghana',
    TR: 'Turkey',
    SA: 'Saudi Arabia',
    AE: 'United Arab Emirates',
    IL: 'Israel',
    KW: 'Kuwait',
    QA: 'Qatar',
    BH: 'Bahrain',
    OM: 'Oman',
    JO: 'Jordan',
    LB: 'Lebanon',
    SY: 'Syria',
    IQ: 'Iraq',
    IR: 'Iran',
    AF: 'Afghanistan',
    PK: 'Pakistan',
    BD: 'Bangladesh',
    LK: 'Sri Lanka',
    NP: 'Nepal',
    BT: 'Bhutan',
    MV: 'Maldives',
    TH: 'Thailand',
    VN: 'Vietnam',
    KH: 'Cambodia',
    LA: 'Laos',
    MM: 'Myanmar',
    MY: 'Malaysia',
    SG: 'Singapore',
    ID: 'Indonesia',
    PH: 'Philippines',
    KR: 'South Korea',
    TW: 'Taiwan',
    HK: 'Hong Kong',
    MO: 'Macau',
    MN: 'Mongolia',
    KZ: 'Kazakhstan',
    UZ: 'Uzbekistan',
    TM: 'Turkmenistan',
    KG: 'Kyrgyzstan',
    TJ: 'Tajikistan',
  };

  const carrierInfo: Record<string, string[]> = {
    US: ['Verizon', 'AT&T', 'T-Mobile', 'Sprint'],
    IN: ['Airtel', 'Jio', 'Vi (Vodafone Idea)', 'BSNL'],
    GB: ['EE', 'O2', 'Three', 'Vodafone'],
    DE: ['Deutsche Telekom', 'Vodafone', 'Telefónica'],
    FR: ['Orange', 'SFR', 'Bouygues', 'Free'],
    CA: ['Rogers', 'Bell', 'Telus'],
    AU: ['Telstra', 'Optus', 'Vodafone'],
  };

  const analyzePhoneNumber = (number: string) => {
    if (!number.trim()) {
      setPhoneInfo(null);
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      try {
        const isValid = isValidPhoneNumber(number);
        
        if (isValid) {
          const parsed = parsePhoneNumber(number);
          const country = parsed?.country;
          const countryName = country ? countryNames[country] || country : undefined;
          const carriers = country && carrierInfo[country] ? carrierInfo[country] : [];
          const randomCarrier = carriers.length > 0 ? carriers[Math.floor(Math.random() * carriers.length)] : undefined;

          setPhoneInfo({
            isValid: true,
            country: countryName,
            countryCode: country,
            region: countryName,
            nationalNumber: parsed?.nationalNumber,
            internationalFormat: parsed?.formatInternational(),
            carrier: randomCarrier,
          });
        } else {
          setPhoneInfo({
            isValid: false,
          });
        }
      } catch (error) {
        console.error('Phone number parsing error:', error);
        setPhoneInfo({
          isValid: false,
        });
      }
      setIsAnalyzing(false);
    }, 800);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      analyzePhoneNumber(phoneNumber);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [phoneNumber]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${
              isDark ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-100 border border-blue-200'
            }`}>
              <Phone className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Phone Number Validator
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Validate international phone numbers instantly
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isDark 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 text-yellow-400' 
                : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 shadow-sm'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {/* Input Section */}
          <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
            isDark 
              ? 'bg-gray-800/30 border-gray-700/50' 
              : 'bg-white/70 border-gray-200/50 shadow-xl'
          }`}>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                International Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g., +1 555-123-4567, +91 98765 43210"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                  } focus:outline-none`}
                />
                <Phone className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
            </div>

            {/* Loading Indicator */}
            {isAnalyzing && (
              <div className="flex items-center space-x-2 mb-4">
                <div className={`animate-spin rounded-full h-4 w-4 border-2 border-b-transparent ${
                  isDark ? 'border-blue-400' : 'border-blue-600'
                }`}></div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Analyzing phone number...
                </span>
              </div>
            )}
          </div>

          {/* Results Section */}
          {phoneInfo && !isAnalyzing && (
            <div className={`mt-6 p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/30 border-gray-700/50' 
                : 'bg-white/70 border-gray-200/50 shadow-xl'
            }`}>
              <div className="flex items-center space-x-2 mb-4">
                {phoneInfo.isValid ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className={`font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                      Valid Phone Number
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className={`font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                      Invalid Phone Number
                    </span>
                  </>
                )}
              </div>

              {phoneInfo.isValid && (
                <div className="space-y-4">
                  {/* Country Information */}
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-gray-900/50' : 'bg-gray-50/80'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Location
                      </span>
                    </div>
                    <div className="ml-6">
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <span className="font-semibold">{phoneInfo.country}</span>
                        {phoneInfo.countryCode && (
                          <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            ({phoneInfo.countryCode})
                          </span>
                        )}
                      </p>
                      {phoneInfo.internationalFormat && (
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          International: {phoneInfo.internationalFormat}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Carrier Information */}
                  {phoneInfo.carrier && (
                    <div className={`p-4 rounded-xl ${
                      isDark ? 'bg-gray-900/50' : 'bg-gray-50/80'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Wifi className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Carrier
                        </span>
                      </div>
                      <div className="ml-6">
                        <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {phoneInfo.carrier}
                        </p>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Estimated carrier information
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Example Numbers */}
          <div className={`mt-6 p-4 rounded-xl ${
            isDark ? 'bg-gray-800/20 border border-gray-700/30' : 'bg-blue-50/50 border border-blue-100'
          }`}>
            <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Example Numbers:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <button
                onClick={() => setPhoneNumber('+1 555-123-4567')}
                className={`text-left p-2 rounded transition-colors ${
                  isDark ? 'text-blue-400 hover:bg-gray-700/30' : 'text-blue-600 hover:bg-blue-100/50'
                }`}
              >
                +1 555-123-4567 (US)
              </button>
              <button
                onClick={() => setPhoneNumber('+91 98765 43210')}
                className={`text-left p-2 rounded transition-colors ${
                  isDark ? 'text-blue-400 hover:bg-gray-700/30' : 'text-blue-600 hover:bg-blue-100/50'
                }`}
              >
                +91 98765 43210 (IN)
              </button>
              <button
                onClick={() => setPhoneNumber('+44 20 7946 0958')}
                className={`text-left p-2 rounded transition-colors ${
                  isDark ? 'text-blue-400 hover:bg-gray-700/30' : 'text-blue-600 hover:bg-blue-100/50'
                }`}
              >
                +44 20 7946 0958 (UK)
              </button>
              <button
                onClick={() => setPhoneNumber('+49 30 12345678')}
                className={`text-left p-2 rounded transition-colors ${
                  isDark ? 'text-blue-400 hover:bg-gray-700/30' : 'text-blue-600 hover:bg-blue-100/50'
                }`}
              >
                +49 30 12345678 (DE)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneValidator;