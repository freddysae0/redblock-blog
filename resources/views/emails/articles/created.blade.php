<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Article Published</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            color: #1f2937;
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

        .logo-image {
            max-width: 120px;
            height: auto;
            margin-bottom: 16px;
        }

        .logo-text {
            font-size: 24px;
            font-weight: 700;
            color: #111827;
            text-decoration: none;
            letter-spacing: -0.025em;
            display: block;
        }

        .card {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }

        .badge {
            display: inline-block;
            background-color: #111827;
            color: #ffffff;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }

        .article-title {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 16px 0;
            color: #111827;
            line-height: 1.3;
        }

        .article-title a {
            color: #111827;
            text-decoration: none;
        }

        .article-title a:hover {
            color: #374151;
        }

        .meta {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid #e5e7eb;
        }

        .meta strong {
            color: #111827;
            font-weight: 600;
        }

        .excerpt-wrapper {
            background-color: #f9fafb;
            border-left: 4px solid #111827;
            border-radius: 4px;
            padding: 20px;
            margin-bottom: 32px;
        }

        .excerpt-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #6b7280;
            margin-bottom: 8px;
        }

        .excerpt-body {
            color: #374151;
            font-size: 15px;
            line-height: 1.6;
            margin: 0;
        }

        .button-container {
            text-align: center;
        }

        .button {
            display: inline-block;
            background-color: #111827;
            color: #ffffff !important;
            padding: 14px 36px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: background-color 0.2s;
        }

        .button:hover {
            background-color: #1f2937;
        }

        .footer {
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
        }

        .footer a {
            color: #6b7280;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="{{ config('app.url') }}">
                <img src="{{ asset('logo.webp') }}" alt="Redblock Logo" class="logo-image">
            </a>
            <a href="{{ config('app.url') }}" class="logo-text" style="color: #111827 !important; text-decoration: none;">
                Redblock Online
            </a>
        </div>

        <div class="card">
            <div class="badge">New Article</div>

            <h1 class="article-title">
                <a href="{{ route('articles.show', $article->slug) }}" style="color: #111827 !important; text-decoration: none;">
                    {{ $article->title }}
                </a>
            </h1>

            <div class="meta">
                A new article has just been published on <strong>Redblock Blog</strong>
                @if ($article->categories && $article->categories->count() > 0)
                    in
                    @foreach ($article->categories as $category)
                        <strong>{{ $category->title }}</strong>@if (!$loop->last), @endif
                    @endforeach
                @endif
            </div>

            @if ($article->short_description)
                <div class="excerpt-wrapper">
                    <div class="excerpt-label">Preview</div>
                    <div class="excerpt-body">{{ Str::limit($article->short_description, 200) }}</div>
                </div>
            @endif

            <div class="button-container">
                <a href="{{ route('articles.show', $article->slug) }}" class="button" style="background-color: #111827 !important; color: #ffffff !important; text-decoration: none; display: inline-block; padding: 14px 36px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                    Read Full Article
                </a>
            </div>
        </div>

        <div class="footer">
            <p>&copy; {{ date('Y') }} Redblock Online. All rights reserved.</p>
            <p>
                <a href="{{ config('app.url') }}/blog" style="color: #6b7280 !important; text-decoration: none;">Visit our blog</a>
            </p>
        </div>
    </div>
</body>

</html>
