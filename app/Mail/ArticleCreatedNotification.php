<?php

namespace App\Mail;

use App\Models\Article;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ArticleCreatedNotification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Article $article
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Article Published: ' . $this->article->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.articles.created',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
