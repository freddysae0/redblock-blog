import { useForm, usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { type SharedData, type Comment } from '@/types';

interface Props {
    articleId: number;
    comments: Comment[];
}

export function CommentSection({ articleId, comments }: Props) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        body: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/articles/${articleId}/comments`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="border-t border-border pt-12">
            <h3 className="text-2xl font-bold mb-8">Comments ({comments.length})</h3>

            {/* Comment Form */}
            <div className="mb-12">
                {auth.user ? (
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Textarea
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                placeholder="Leave a comment..."
                                className="min-h-[100px]"
                                required
                            />
                            <InputError message={errors.body} className="mt-2" />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                Post Comment
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-muted/50 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground mb-4">Please log in to leave a comment.</p>
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" asChild>
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Register</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Comments List */}
            <div className="space-y-8">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                            {comment.user.name.charAt(0)}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{comment.user.name}</span>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-muted-foreground whitespace-pre-wrap">{comment.body}</p>
                        </div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-muted-foreground italic">No comments yet. Be the first to share your thoughts!</p>
                )}
            </div>
        </div>
    );
}
