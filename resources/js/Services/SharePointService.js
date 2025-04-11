import axios from 'axios';

class SharePointService {
    constructor() {
        this.baseUrl = null;
        this.accessToken = null;
    }

    /**
     * Initialize the service with a base SharePoint URL
     * @param {string} baseUrl - The base URL of the SharePoint site
     */
    init(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * Authenticate with SharePoint using client credentials
     * Note: This would typically be done through a backend service for security
     * This is a simplified example
     */
    async authenticate(clientId, clientSecret, tenantId) {
        try {
            const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
            
            const response = await axios.post(tokenEndpoint, {
                client_id: clientId,
                client_secret: clientSecret,
                scope: 'https://graph.microsoft.com/.default',
                grant_type: 'client_credentials'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            
            this.accessToken = response.data.access_token;
            return true;
        } catch (error) {
            console.error('Authentication error:', error);
            return false;
        }
    }

    /**
     * Get a file from SharePoint
     * @param {string} fileUrl - The relative URL of the file within the SharePoint site
     */
    async getFile(fileUrl) {
        try {
            if (!fileUrl.startsWith('http')) {
                fileUrl = this.baseUrl + fileUrl;
            }
            
            let config = {};
            
            if (this.accessToken) {
                config.headers = {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Accept': 'application/json'
                };
            }
            
            const response = await axios.get(fileUrl, {
                ...config,
                responseType: 'arraybuffer'
            });
            
            return response.data;
        } catch (error) {
            console.error('Error fetching file:', error);
            throw error;
        }
    }

    /**
     * Get a file from SharePoint using a sharing link
     * @param {string} sharingUrl - The sharing URL of the Excel file
     */
    async getFileFromSharingLink(sharingUrl) {
        try {
            if (this.isSharePointSharingLink(sharingUrl)) {
                const fileId = this.extractFileIdFromSharingLink(sharingUrl);
                const tenantDomain = this.extractTenantFromSharingLink(sharingUrl);
                
                if (!fileId || !tenantDomain) {
                    throw new Error('Invalid SharePoint sharing link format');
                }

                const downloadUrl = `https://${tenantDomain}/personal/${this.extractUserPath(sharingUrl)}/_layouts/15/download.aspx?share=${fileId}`;
                
                const response = await axios.get(downloadUrl, {
                    responseType: 'arraybuffer',
                    headers: {
                        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    }
                });
                
                return response.data;
            } else {
                const response = await axios.get(sharingUrl, {
                    responseType: 'arraybuffer',
                    headers: {
                        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    }
                });
                
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching SharePoint file:', error);
            throw new Error('Could not download the file from SharePoint. The sharing link may not be publicly accessible.');
        }
    }

    /**
     * Check if the URL is a SharePoint sharing link
     * @param {string} url - URL to check
     * @returns {boolean} True if it's a SharePoint sharing link
     */
    isSharePointSharingLink(url) {
        return url.includes('sharepoint.com/:') && url.includes('/g/');
    }

    /**
     * Extract the file ID from a SharePoint sharing link
     * @param {string} url - SharePoint sharing link
     * @returns {string} File ID
     */
    extractFileIdFromSharingLink(url) {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/');
            
            const gIndex = pathParts.findIndex(part => part === 'g');
            if (gIndex !== -1 && gIndex < pathParts.length - 1) {
                return pathParts[gIndex + 1];
            }
            
            if (urlObj.searchParams.has('id')) {
                return urlObj.searchParams.get('id');
            }
            
            return null;
        } catch (error) {
            console.error('Error extracting file ID:', error);
            return null;
        }
    }

    /**
     * Extract tenant domain from a SharePoint sharing link
     * @param {string} url - SharePoint sharing link
     * @returns {string} Tenant domain
     */
    extractTenantFromSharingLink(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch (error) {
            console.error('Error extracting tenant:', error);
            return null;
        }
    }

    /**
     * Extract user path from SharePoint URL
     * @param {string} url - SharePoint URL
     * @returns {string} User path
     */
    extractUserPath(url) {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/');
            
            const personalIndex = pathParts.findIndex(part => part === 'personal');
            if (personalIndex !== -1 && personalIndex < pathParts.length - 1) {
                return pathParts[personalIndex + 1];
            }
            
            return '';
        } catch (error) {
            console.error('Error extracting user path:', error);
            return '';
        }
    }

    /**
     * Parse a SharePoint URL to extract site and file path
     * @param {string} url - Full SharePoint URL
     * @returns {Object} Object with baseUrl and filePath
     */
    parseSharePointUrl(url) {
        try {
            const urlObj = new URL(url);
            
            const pathParts = urlObj.pathname.split('/');
            const siteIndex = pathParts.findIndex(part => part === 'sites' || part === 'teams');
            
            if (siteIndex === -1) {
                throw new Error('Invalid SharePoint URL format');
            }
            
            const siteName = pathParts[siteIndex + 1];
            
            const baseUrl = `${urlObj.protocol}//${urlObj.hostname}/sites/${siteName}`;
            
            const filePath = '/' + pathParts.slice(siteIndex + 2).join('/');
            
            return {
                baseUrl,
                filePath
            };
        } catch (error) {
            console.error('Error parsing SharePoint URL:', error);
            throw error;
        }
    }

    /**
     * Set up real-time data fetching from a SharePoint URL
     * @param {string} url - The SharePoint URL to fetch from
     * @param {Function} callback - The callback to execute with the fetched data
     * @param {number} interval - Interval in milliseconds for fetching data
     * @returns {number} Timer ID for the interval
     */
    setupRealTimeDataFetching(url, callback, interval = 60000) {
        if (!url || typeof callback !== 'function') {
            throw new Error('URL and callback function are required');
        }
        
        this.realTimeUrl = url;
        
        this.fetchDataAndProcess(url, callback);
        
        const timerId = setInterval(() => {
            this.fetchDataAndProcess(url, callback);
        }, interval);
        
        return timerId;
    }
    
    /**
     * Stop real-time data fetching
     * @param {number} timerId - The timer ID to clear
     */
    stopRealTimeDataFetching(timerId) {
        if (timerId) {
            clearInterval(timerId);
        }
    }
    
    /**
     * Fetch data from SharePoint and process it with the callback
     * @param {string} url - URL to fetch from
     * @param {Function} callback - Callback to process the data
     */
    async fetchDataAndProcess(url, callback) {
        try {
            let fileData;
            
            if (this.isSharePointSharingLink(url)) {
                fileData = await this.getFileFromSharingLink(url);
            } else if (url.includes('sharepoint.com')) {
                const { baseUrl, filePath } = this.parseSharePointUrl(url);
                this.init(baseUrl);
                fileData = await this.getFile(filePath);
            } else {
                const response = await axios.get(url, {
                    responseType: 'arraybuffer',
                    headers: {
                        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    }
                });
                fileData = response.data;
            }
            
            const data = new Uint8Array(fileData);
            
            try {
                const processedData = await this.processExcelData(data);
                if (processedData) {
                    callback(processedData);
                } else {
                    callback(null, new Error('Failed to process Excel data'));
                }
            } catch (err) {
                callback(null, err);
            }
        } catch (error) {
            console.error('Error in real-time data fetching:', error);
            callback(null, error);
        }
    }
    
    /**
     * Process Excel data from Uint8Array
     * @param {Uint8Array} data - Excel file data
     * @returns {Promise<Array|null>} Processed JSON data or null on error
     */
    async processExcelData(data) {
        try {
            const XLSX = await import('xlsx');
            
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            return XLSX.utils.sheet_to_json(worksheet);
        } catch (error) {
            console.error('Error processing Excel data:', error);
            return null;
        }
    }
}

export default new SharePointService();
