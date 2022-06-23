# HackUST 2022 | Group Placeholder | A website/chrome extension that simplify article for languague learning

## Website
https://isaac-portfo-flashy.surge.sh

## Goal
Our goal of this website is to create a platform that simplfies online text with machine learning. The frontend and backend are developed by Isaac Wu, while the machine learning program is developed by David Cheung, and the UI/UX design a developed by Celine Fung.

## UI/UX
you can view the UI/UX prototype through this link: https://www.figma.com/file/7Vo0avkbcd4mH1yHBq1z1W/Flashy?node-id=0%3A1

## Setup
### Backend service
1. In ./backend folder, create a environment using your favourite virtual environment software (venv/conda).
2. In your virtual environment, download packages using this command(under ./backend): `pip install -r requirements.txt`
3. Start the backend service by typing this command: `python manage.py runserver`
4. The backend service is now hosted in the http://localhost:8000
### Frontend service
1. Download [node.js with npm](https://nodejs.org/en/), then install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
2. In ./web folder, install dependencies using this command: `yarn`
3. Run `yarn start` to start the web as developement mode
4. The frontend service is now hosted in the http://localhost:3000
5. If you didn't use http://localhost:8000 as your backend service url, please update the backend url under ./web/.env.developemnt file
### Chrome extension
1. Load the extension by following this [guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked), choose the ./chrome-extension folder when selecting the extension directory.

## Used packages
- Django
- Django-rest-framework
- PyTorch
- Trafilatura
- React.js with CRA
- Axios
- React query
- Redux
- React Router
- Styled components
- node-sass
- mozilla/readability

## License
Please check the LICENSE file in this repository
