<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Comment Notification</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            /* Gray-50 */
            color: #1f2937;
            /* Gray-800 */
            margin: 0;
            padding: 0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 32px;
        }

        .logo {
            font-size: 24px;
            font-weight: 700;
            color: #111827;
            /* Gray-900 */
            text-decoration: none;
            letter-spacing: -0.025em;
        }

        .logo span {
            color: #ef4444;
            /* Red-500 */
        }

        .card {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            /* Gray-200 */
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }

        .title {
            font-size: 20px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 24px;
            color: #111827;
            /* Gray-900 */
            text-align: center;
        }

        .meta {
            color: #6b7280;
            /* Gray-500 */
            font-size: 14px;
            margin-bottom: 24px;
            text-align: center;
        }

        .meta strong {
            color: #374151;
            /* Gray-700 */
            font-weight: 600;
        }

        .comment-wrapper {
            background-color: #f3f4f6;
            /* Gray-100 */
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 32px;
            border: 1px solid #e5e7eb;
            /* Gray-200 */
        }

        .comment-body {
            color: #4b5563;
            /* Gray-600 */
            font-size: 15px;
            white-space: pre-wrap;
            margin: 0;
        }

        .button-container {
            text-align: center;
        }

        .button {
            display: inline-block;
            background-color: #ef4444;
            /* Red-500 */
            color: #ffffff;
            padding: 12px 32px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
            transition: background-color 0.2s;
        }

        .button:hover {
            background-color: #dc2626;
            /* Red-600 */
        }

        .footer {
            text-align: center;
            color: #9ca3af;
            /* Gray-400 */
            font-size: 12px;
            margin-top: 32px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="{{ config('app.url') }}" class="logo">
                Redblock Online
            </a>
        </div>

        <div class="card">
            <h1 class="title">New Comment</h1>

            <div class="meta">
                <strong>{{ $comment->user->name }}</strong> commented on
                <a href="{{ route('articles.show', $comment->article->slug) }}"
                    style="color: #ef4444; text-decoration: none; font-weight: 500;">
                    {{ $comment->article->title }}
                </a>
            </div>

            <div class="comment-wrapper">
                <div class="comment-body">{{ $comment->body }}</div>
            </div>

            <div class="button-container">
                <a href="{{ route('comments.index') }}" class="button">
                    Moderate Comment
                </a>
            </div>
        </div>

        <div class="footer">
            &copy; {{ date('Y') }} RedBlock Blog. All rights reserved.
        </div>
    </div>
</body>

</html>