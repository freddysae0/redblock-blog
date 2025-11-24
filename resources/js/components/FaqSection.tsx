export function FaqSection() {
    return (
        <div className="mb-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">
                    Quick answers to common questions
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                <details className="bg-card border border-border rounded-xl p-6 group hover:border-primary/50 transition-colors">
                    <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                        <span>What is Redblock Online?</span>
                        <svg className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Redblock Online is an under construction community-driven FPS aim training platform with a powerful world editor, multiplayer training modes, and custom game scenarios. It is designed to help you improve your aim while having fun.
                    </p>
                </details>

                <details className="bg-card border border-border rounded-xl p-6 group hover:border-primary/50 transition-colors">
                    <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                        <span>How can I join the Circuitbreakers beta program?</span>
                        <svg className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        You can join the Circuitbreakers beta program by registering on our platform. Just start <a href="/register" className="text-primary hover:underline">here</a> to get early access.
                    </p>
                </details>

                <details className="bg-card border border-border rounded-xl p-6 group hover:border-primary/50 transition-colors">
                    <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                        <span>Is Redblock Online free to use?</span>
                        <svg className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Yes, Redblock Online is free to use. We believe everyone should have access to quality aim training tools to improve their FPS skills.
                    </p>
                </details>

                <details className="bg-card border border-border rounded-xl p-6 group hover:border-primary/50 transition-colors">
                    <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                        <span>What games does Redblock Online support?</span>
                        <svg className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Redblock Online supports game-specific profiles for popular FPS games including Valorant, CS2, Apex Legends, and more. You can train with the exact sensitivity and mechanics of your favorite game.
                    </p>
                </details>

                <details className="bg-card border border-border rounded-xl p-6 group hover:border-primary/50 transition-colors">
                    <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                        <span>How do I report a bug or suggest a feature?</span>
                        <svg className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        You can report bugs or suggest features by filling out the contact form, joining our Telegram channel, or sending us an email at support@redblock.online. We appreciate all feedback.
                    </p>
                </details>

                <details className="bg-card border border-border rounded-xl p-6 group hover:border-primary/50 transition-colors">
                    <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                        <span>Can I create my own training scenarios?</span>
                        <svg className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Yes. Redblock Online includes a world editor that lets you create custom training scenarios without any coding. You can also share your creations with the community.
                    </p>
                </details>
            </div>
        </div>
    );
}
