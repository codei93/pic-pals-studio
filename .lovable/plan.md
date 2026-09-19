# Reusable fan and creator chat

## Build
- Create one reusable three-column chat workspace matching the uploaded screen: conversation list, active conversation, and profile/activity details.
- Support fan and creator modes through props so `/chat` and `/creator/chat` share the same UI while labels, sender alignment, and account context adapt.
- Preserve the existing sample conversations, locked media, send-message interaction, and thread navigation.
- Make the workspace collapse cleanly for tablet and mobile without overlapping the existing navigation.

## Technical details
- Compose the transcript and message composer from the approved AI Elements chat primitives.
- Keep data local to the existing prototype; no login, storage, or payment changes.
- Verify both pages at desktop and mobile sizes, including message sending and thread switching.
