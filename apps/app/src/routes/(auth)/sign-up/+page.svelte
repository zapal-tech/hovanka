<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public'
  import Button from '$lib/components/button.svelte'
  // import Input from '$lib/components/fields/input.svelte'
  import AuthLayout from '$lib/components/layouts/auth.svelte'
  import * as m from '$lib/paraglide/messages'
</script>

<svelte:head>
  <title>{m.sign_up()} | {m.name()} - {m.tagline()}</title>
  <meta name="description" content={m.description()} />
</svelte:head>

<AuthLayout title={m.sign_up_title()} subtitle={m.sign_up_subtitle()}>
  <Button color="green" class="w-full" href={`${PUBLIC_API_URL}/api/users/oauth/google/authorize`}
    >{m.sign_up_with_google_button()}</Button
  >

  <!-- <form>
    <div class="space-y-6">
      <Input label={m.input_email_address()} name="email" type="email" autoComplete="email" required />
      <Input label={m.input_password()} name="password" autocomplete="new-password" type="password" required />
      <Input label={m.input_repeat_password()} name="repeat-password" autocomplete="new-password" type="password" required />
    </div>

    <Button type="submit" color="green" class="mt-8 w-full">{m.sign_up_button()}</Button>
  </form> -->

  <p class="mt-4 text-center text-sm text-green-900">
    {@html m.policies()}
  </p>
</AuthLayout>
