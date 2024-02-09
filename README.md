# sentry-mattermost

Send sentry alerts to your mattermost channel

## Usage

Set `MATTERMOST_WEBHOOK_URL` env for the deployment.

## Configuration in sentry projects

- In the **PROJECT** settings (`/settings/[org]/projects/[project]]/alerts/`), add the webhook URL, and add `?channel=[project]-sentry` if you want to specify a specific channel.
- In the **PROJECT** alerts (`/organizations/[org]/alerts/rules/[project]`), add a Rule to send events to the "integration" "Webhooks".

:warning: The channel MUST ends with `-sentry` to prevent spam.
