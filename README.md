# TRANSIT API 3 - DATABSE
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FBenjamin-del%2Fgtfsc%2Fmain%2Fupdate.json&query=update&label=Last%20Update&color=red) 
[![Condense Files & Upload](https://github.com/Benjamin-del/gtfsc/actions/workflows/condense-job.yml/badge.svg)](https://github.com/Benjamin-del/gtfsc/actions/workflows/condense-job.yml)

This repo contains the back end code for the database that powers Transit API v3. This database is updated every Sunday night via Github Workflows.

## How to use

The databse is triggered by a cron job. You can change this in `.github/workflows/job.yml` by changing the CRON paramater. You can also manualy run the workflow by clicking on the `Run Workflow` button in the Actions tab. The finish time is found at `update.json` and is updated every time the workflow is run.