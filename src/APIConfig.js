// https://cv-submission.herokuapp.com/

let apiUrl;
const django = 8000;
const apiUrls = {
	production: 'https://cv-submission.herokuapp.com',
	development: `http://localhost:${django}`,
};

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development;
} else {
	apiUrl = apiUrls.production;
}

export default apiUrl;