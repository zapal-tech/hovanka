<script lang="ts">
  import Button from '$lib/components/button.svelte'
  import Input from '$lib/components/fields/input.svelte'
  import AuthLayout from '$lib/components/layouts/auth.svelte'
  import * as m from '$lib/paraglide/messages'
</script>

<svelte:head>
  <title>{m.sign_up()} | {m.name()} - {m.tagline()}</title>
  <meta name="description" content={m.description()} />
</svelte:head>

<AuthLayout title={m.auth_sign_up_title()} subtitle={m.auth_sign_up_subtitle()}>
  <form>
    <div class="space-y-6">
      <Input label={m.your_email()} name="email" type="email" autoComplete="email" required />
      <Input label={m.password()} name="password" autocomplete="new-password" type="password" required />
      <Input label={m.repeat_password()} name="repeat-password" autocomplete="new-password" type="password" required />
    </div>

    <Button type="submit" color="green" class="mt-8 w-full">{m.auth_sign_up_button()}</Button>
  </form>
</AuthLayout>
