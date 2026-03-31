<script lang="ts">
    let name = '';
    let email = '';
    let message = '';
    let submitted = false;
    
    async function handleSubmit() {
        await new Promise(r => setTimeout(r, 1000));
        submitted = true;
    }
</script>

<svelte:head>
    <title>Contact</title>
</svelte:head>

<div class="min-h-screen bg-base-100 py-20 px-4">
    <div class="max-w-xl mx-auto">
        <h1 class="text-4xl font-bold mb-4 text-center">Get in Touch</h1>
        
        {#if submitted}
            <div class="alert alert-success mb-8">Message sent!</div>
        {/if}
        
        <form on:submit|preventDefault={handleSubmit} class="card bg-base-200 shadow-xl">
            <div class="card-body space-y-6">
                <div class="form-control">
                    <label class="label" for="name"><span class="label-text">Name</span></label>
                    <input type="text" id="name" bind:value={name} class="input input-bordered" required />
                </div>
                <div class="form-control">
                    <label class="label" for="email"><span class="label-text">Email</span></label>
                    <input type="email" id="email" bind:value={email} class="input input-bordered" required />
                </div>
                <div class="form-control">
                    <label class="label" for="message"><span class="label-text">Message</span></label>
                    <textarea id="message" bind:value={message} class="textarea textarea-bordered h-40" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </div>
        </form>
    </div>
</div>
