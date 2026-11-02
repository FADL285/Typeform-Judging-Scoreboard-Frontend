<div align="center">
    <h1>Typeform - Judging Scoreboard - Front-End</h1>
    <img src="https://user-images.githubusercontent.com/53804570/196001680-ce93ed21-9302-483f-a6f6-9b5ea1ea444f.gif" alt="Logo" />
    <p>Fetch responses from Typeform and display it in a score board - it fetch workspace forms and set each form as card which has Teams (multiple_choice or picture_choice) and display the total rating score.</p>
</div>

## What the application covers?

- [x] Fetch Specific Workspace Forms <WORKSPACE_ID> `required`
- [x] Bind each form name to a specific category.
  > 💡 NOTE: Workspace forms are fetched once and then cached on the server, `make sure you create the forms before running the app on the server` - don't worry, you can update the forms at any time.
- [x] Fetch form responses and return each team score. `map each judge to his responses "Judge name is "`
- [x] Fetch Form Variable if you need them

## Typeform Qurstion Structure

| Question          | Type                                  |
| :---------------- | :------------------------------------ |
| `choose a team`   | `multiple_choice` or `picture_choice` |
| `rating question` | `rating`                              |

> This is a [demo team evaluation form](https://form.typeform.com/to/A9z6bGlu#judge=Mohamed%20Fadl), take a look at it.

## Requirements to run it locally

- [Node.js](https://nodejs.org/en/)

## Environment Setup

**Copy `.env.exmample` to .env and update the environment variables with your values**

```bash
  cp .env.example .env
```

**`.env` Structure**

```bash
VITE_APP_NAME="Your App Name"
VITE_BASE_URL="Your Backend Endpoint URL" # Required
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deploy

You can deploy the application on any hosting services platform

**Free Hosting Platforms**:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

## Authors

- [@FADL285](https://www.github.com/FADL285)

## License

[ISC](https://choosealicense.com/licenses/isc/)

## Authentication and score ordering

Deploy with the paired backend server-authentication update. Only `VITE_APP_NAME` and `VITE_BASE_URL` belong in frontend configuration. Remove `VITE_AUTH_*`; passwords and signing secrets belong exclusively on the backend. Login exchanges credentials for an eight-hour server-signed bearer token held in session storage and attached to scoreboard requests. Use HTTPS.

Teams retain the original event implementation: rank by descending SUM of all criterion ratings across submitted judging responses. Cards separately display the average per judging response (sum divided by response count), as the original UI did. Equal sums retain input order. No average-based ranking policy is introduced. Missing or invalid criterion ratings stop provisional ranking with an explicit incomplete-data error; they are not silently awarded zero.

Run scoring regression checks with `npm test`.

Backend URLs must use HTTPS; HTTP is accepted only for explicit Vite local development to localhost/127.0.0.1/::1. Login and scoreboard requests have a 15-second deadline. Denied session storage remains safely signed out; persistence must succeed before a new login is published, and superseded login responses are ignored.

A competition with no rating criteria now fails explicitly instead of producing an all-zero ranking. Teams with no submissions retain the original zero-total behavior; no new disqualification or award policy is introduced.
