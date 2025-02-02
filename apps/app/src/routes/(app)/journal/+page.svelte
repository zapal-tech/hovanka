<script>
  import Button from '$lib/components/button.svelte'
  import Input from '$lib/components/fields/input.svelte'
</script>

<form method="POST" class="grid w-full grid-cols-12 gap-2">
  <Input
    name="title"
    placeholder="Leave your thoughts here"
    aria-label="Leave your thoughts here"
    type="textarea"
    class="col-span-9 sm:col-span-10 lg:col-span-11"
  />
  <Button class="col-span-3 sm:col-span-2 lg:col-span-1">Save</Button>
</form>
