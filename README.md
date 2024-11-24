# ThinkMate - Your AI Knowledge Companion

ThinkMate is an AI-powered web application designed to generate counter-arguments based on input text. Using advanced language models, ThinkMate helps users analyze arguments and develop alternative perspectives in real-time.

## Features
- **Counter-Argument Generation**: Input an argument, and ThinkMate will generate a counter-argument using an AI model.
- **Real-Time Feedback**: See the generated counter-argument as it's being formed with real-time streaming.
- **History Sidebar**: Previous inputs and generated counter-arguments are stored and can be revisited anytime.
- **Adjustable Parameters**: Control the `temperature` and `top-k` values to fine-tune the output.
  ![image](https://github.com/user-attachments/assets/dae52527-a485-42d1-a6b8-da75be5976e7)
  ![image](https://github.com/user-attachments/assets/382a99db-754a-45a8-863c-bae2610d219d)
  ![image](https://github.com/user-attachments/assets/956355e3-6c91-455c-8139-c76d737bbce4)




## Technologies Used
- **AI Language Model**: Customizable parameters for controlling creativity and diversity of responses and Google Nano API (Prompt API)
- **HTML/CSS/JavaScript**: The core web technologies for the frontend interface.
- **Marked.js**: Converts markdown into HTML for rendering the counter-argument.
- **DOMPurify**: Ensures the generated HTML is sanitized for security purposes.
- **Bootstrap**: Provides a responsive and modern UI layout.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RD500/ThinkMate.git
   cd thinkmate

# Setup Guide

## Prerequisites

1. **Acknowledge Google’s Generative AI Prohibited Uses Policy.**  
   Ensure you understand and comply with this policy before proceeding.

2. **Download Chrome Dev or Canary Channel:**  
   - Confirm that your Chrome version is equal to or newer than `128.0.6545.0`.

3. **Check Device Requirements:**  
   - Ensure your device meets the necessary requirements.  
   - You **must have at least 22 GB of free storage space.**  
   - If the available storage space falls below 10 GB after the download, the model will be deleted.  
     > **Note:**  
     > Some operating systems may report free disk space differently. For accurate readings on macOS, use **Disk Utility** to check your available free disk space.

---

## Enabling Gemini Nano and the Prompt API  

Follow these steps to enable Gemini Nano and the Prompt API for local experimentation:

1. Open a new tab in Chrome and navigate to:  
   `chrome://flags/#optimization-guide-on-device-model`

2. Enable **Bypass Performance Requirements**:  
   - Select `Enabled BypassPerfRequirement`.  
   - This step ensures Gemini Nano can be downloaded on your device.

3. Navigate to:  
   `chrome://flags/#prompt-api-for-gemini-nano`

4. Enable **Prompt API**:  
   - Select `Enabled`.

5. Relaunch Chrome.  

---

## Confirming the Availability of Gemini Nano  

1. Open **DevTools** in Chrome and run the following command in the console:  
   ```javascript
   (await ai.languageModel.capabilities()).available;
# Confirming the Availability of Gemini Nano

If this returns `"readily"`, then you are all set!

If this fails, proceed with the following steps:

---

📣 **Force Chrome to recognize the API:**

1. Open **DevTools** and run the following command:
   ```javascript
   await ai.languageModel.create();```
   This will likely fail, but it's intended to trigger recognition.
2. Relaunch Chrome.
3. Open a new tab in Chrome and navigate to: 
   `chrome://components`
4. Confirm that Gemini Nano is available or being downloaded:

   Look for Optimization Guide On Device Model with a version greater than or equal to 2024.5.21.1031.
   If no version is listed, click Check for update to force the download.
5. Once the model has downloaded, run the following command in DevTools:
   ```(await ai.languageModel.capabilities()).available;```
   If this returns "readily", then you are all set!
   If not, relaunch Chrome, wait for a little while, and retry from step 1.
By following the above steps, you can enable and confirm the availability of Gemini Nano and the Prompt API for your local setup


