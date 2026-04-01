<svelte:head>
    <title>Contact - Cesar Cai</title>
    <meta name="description" content="Get in touch with Cesar Cai for collaborations or inquiries." />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 py-20">
    <section class="space-y-12">
        <div class="space-y-4">
            <p class="text-sm font-medium text-gray-500 tracking-wide uppercase">Contact</p>
            <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
                Let's Work<br />
                <span class="text-gray-400">Together</span>
            </h1>
            <p class="text-lg text-gray-600 max-w-xl">
                Have a project in mind or just want to chat? Feel free to reach out.
            </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="space-y-8">
                <div class="space-y-2">
                    <h3 class="font-semibold text-gray-900">Email</h3>
                    <a href="mailto:hello@cesarcai.site" class="text-gray-600 hover:text-gray-900 transition-colors">
                        hello@cesarcai.site
                    </a>
                </div>
                
                <div class="space-y-2">
                    <h3 class="font-semibold text-gray-900">GitHub</h3>
                    <a href="https://github.com/caijinhai" target="_blank" rel="noopener" class="text-gray-600 hover:text-gray-900 transition-colors">
                        @caijinhai
                    </a>
                </div>
                
                <div class="space-y-2">
                    <h3 class="font-semibold text-gray-900">Twitter</h3>
                    <a href="https://twitter.com" target="_blank" rel="noopener" class="text-gray-600 hover:text-gray-900 transition-colors">
                        @cesarcai
                    </a>
                </div>
            </div>
            
            <div class="bg-gray-50 rounded-2xl p-8">
                <form class="space-y-6">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="Your name"
                        />
                    </div>
                    
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="you@example.com"
                        />
                    </div>
                    
                    <div>
                        <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea 
                            id="message" 
                            name="message"
                            rows="4"
                            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                            placeholder="Your message..."
                        ></textarea>
                    </div>
                    
                    <button 
                        type="submit"
                        class="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </section>
</div>
