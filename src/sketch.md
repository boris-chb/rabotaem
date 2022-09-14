# ADD NOTE

1. Create a review
2. let outputObj = getOutputObjects()
3. outputObj.actionObj.notes = 'your note'

# REVIEW LOCK

1. let activityDialog = shadowDOMSearch('yurt-review-activity-dialog')[0]
2. activityDialog.\_\_lockTimeoutSec = 12000 (defualts to 1200)
