<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }

        .field {
            margin-bottom: 20px;
        }

        .field-label {
            font-weight: 600;
            color: #667eea;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .field-value {
            background: white;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }

        .message-box {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #667eea;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>📬 New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Redblock Online Blog</p>
    </div>

    <div class="content">
        <div class="field">
            <div class="field-label">From</div>
            <div class="field-value">
                <strong>{{ $contactMessage->name }}</strong><br>
                <a href="mailto:{{ $contactMessage->email }}" style="color: #667eea; text-decoration: none;">
                    {{ $contactMessage->email }}
                </a>
            </div>
        </div>

        @if($contactMessage->subject)
            <div class="field">
                <div class="field-label">Subject</div>
                <div class="field-value">{{ $contactMessage->subject }}</div>
            </div>
        @endif

        <div class="field">
            <div class="field-label">Message</div>
            <div class="message-box">{{ $contactMessage->message }}</div>
        </div>

        <div class="field">
            <div class="field-label">Additional Information</div>
            <div class="field-value" style="font-size: 13px; color: #6b7280;">
                <strong>Submitted:</strong> {{ $contactMessage->created_at->format('F j, Y \a\t g:i A') }}<br>
                <strong>IP Address:</strong> {{ $contactMessage->ip_address ?? 'N/A' }}
            </div>
        </div>
    </div>

    <div class="footer">
        <p>This email was sent from the Redblock Online Blog contact form.</p>
    </div>
</body>

</html>