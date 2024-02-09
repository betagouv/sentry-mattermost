# sentry-mattermost

sentry to mattermost bridge

## Usage

Set `MATTERMOST_WEBHOOK_URL` env for the deployment.

The in Sentry:

- In the **PROJECT** settings (`/settings/[org]/projects/[project]]/alerts/`), add a webhook to the deployment URL, and add `?channel=[project]-alerts` if you want to specify a specific channel.
- In the **PROJECT** alerts (`/organizations/[org]/alerts/rules/[project]`), add a Rule to send events to the "integration" "Webhooks".
