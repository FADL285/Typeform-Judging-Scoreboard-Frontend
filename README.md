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
VITE_AUTH_USER="Scoreboard Access Username" # Required
VITE_AUTH_PASS="Scoreboard Access Password" # Required
VITE_AUTH_IDENTIFIER="%M0_FAD1@Typeform_Scoreboard@FADL285%#X&^"  # Add a strong password here or keep it as it is 💁
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

Teams are ranked by the same unrounded average total score per submitted judging response that the card displays (rounded only for presentation). Missing criterion answers contribute zero; responses remain in the denominator. Equal averages keep the input order. This preserves the displayed scoring formula while correcting the inconsistent sum-based ranking.

Run scoring regression checks with `npm test`.
