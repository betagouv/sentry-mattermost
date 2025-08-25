# sentry-mattermost

Send sentry alerts to your mattermost channel

## Usage

Set `MATTERMOST_WEBHOOK_URL` env for the deployment.

## Configuration in sentry projects

- In the **PROJECT** settings (`/settings/[org]/projects/[project]]/alerts/`), add the webhook URL, and add `?channel=[project]-sentry` if you want to specify a specific channel.
- In the **PROJECT** alerts (`/organizations/[org]/alerts/rules/[project]`), add a Rule to send events to the "integration" "Webhooks".

:warning: The channel MUST ends with `-sentry` to prevent spam.

There are 2 ways to create a webhook in sentry, and the payload Sentry generates differ for each. This bridge support the legacy webhook. See below for pictures of the sentry UI 

Legacy webhook :white_check_mark:
<img width="1131" height="1091" alt="legacy-webhook" src="https://github.com/user-attachments/assets/490959bb-f28d-4bbf-bde3-32e0d11331ce" />

Orga webhook :x:
<img width="1476" height="891" alt="orga-webhook" src="https://github.com/user-attachments/assets/8566364d-3386-49a2-ad1a-525760575756" />

