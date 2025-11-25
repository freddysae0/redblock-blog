import { Head, useForm } from '@inertiajs/react';
import { Header as BlogHeader } from '@/components/blog/Header';
import { Footer } from '@/components/blog/Footer';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormEventHandler } from 'react';
import { FaqSection } from '@/components/FaqSection';

export default function Contact() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Contact Us">
                <meta
                    name="description"
                    content="Get in touch with the Redblock Online team. We'd love to hear from you!"
                />
                {/* Open Graph */}
                <meta property="og:title" content="Contact Us" />
                <meta
                    property="og:description"
                    content="Get in touch with the Redblock Online team. We'd love to hear from you!"
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://redblock.online/contact" />
                <meta property="og:image" content="https://redblock.online/og-image.png" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us" />
                <meta
                    name="twitter:description"
                    content="Get in touch with the Redblock Online team. We'd love to hear from you!"
                />
                <meta name="twitter:image" content="https://redblock.online/og-image.png" />
            </Head>
            <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
                <BlogHeader />
                <main className="flex-1">

                    {/* Hero Section */}
                    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
                        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                                Get In Touch
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                Contact Us
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Have a question, feedback, or just want to say hi? <br />We'd love to hear from you!
                            </p>
                        </div>
                    </section>

                    {/* Contact Methods */}
                    <section className="py-16 px-6 max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-6 mb-16">
                            {/* Email */}
                            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <h3 className="font-semibold mb-2">Email</h3>
                                <a href="mailto:support@redblock.online" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    support@redblock.online
                                </a>
                            </div>

                            {/* Telegram */}
                            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <h3 className="font-semibold mb-2">Telegram</h3>
                                <a href="https://t.me/+8LeLpqzWwiBiYWZh" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Join our channel
                                </a>
                            </div>

                            {/* Instagram */}
                            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold mb-2">Instagram</h3>
                                <a href="https://instagram.com/redblock.online" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    @redblock.online
                                </a>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <FaqSection />

                        {/* Contact Form */}
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Send us a message</h2>
                                    <p className="text-muted-foreground">
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </p>
                                </div>

                                {wasSuccessful && (
                                    <Alert className="mb-6 bg-green-500/10 border-green-500/20 text-green-600">
                                        <AlertDescription>
                                            Thank you for your message! We'll get back to you soon.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name *</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className={errors.name ? 'border-red-500' : ''}
                                                required
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-500">{errors.name}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className={errors.email ? 'border-red-500' : ''}
                                                required
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-500">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className={errors.subject ? 'border-red-500' : ''}
                                        />
                                        {errors.subject && (
                                            <p className="text-sm text-red-500">{errors.subject}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className={errors.message ? 'border-red-500' : ''}
                                            rows={6}
                                            required
                                        />
                                        {errors.message && (
                                            <p className="text-sm text-red-500">{errors.message}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            'Sending...'
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </section>

                </main>
                <Footer />
            </div>
        </>
    );
}
