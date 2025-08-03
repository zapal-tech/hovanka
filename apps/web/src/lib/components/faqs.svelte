<script lang="ts">
  // filepath: /home/bohdan-kucheriavyi/Documents/Repositories/Zapal/hovanka-site/src/lib/components/Faqs.svelte
  import * as m from '$lib/paraglide/messages'

  import Container from './container.svelte'

  interface Faq {
    question: string
    answer: string
  }

  const faqs: Faq[] = Array.from(Array(50), () => null)
    .map((_value, idx) => ({
      question: (m as Record<string, (() => string) | undefined>)?.[`faq_${idx}_question`]?.(),
      answer: (m as Record<string, (() => string) | undefined>)?.[`faq_${idx}_answer`]?.(),
    }))
    .filter((faq) => faq.question && faq.answer) as Faq[]
</script>

<section id="faqs" aria-labelledby="faqs-title" class="border-t border-green-200 py-20 sm:py-32">
  <Container>
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 id="faqs-title" class="font-serif text-4xl font-semibold tracking-tight text-green-950">{m.faq_title()}</h2>
      <p class="mt-2 text-lg text-green-700">
        <span>{m.faq_subtitle_prefix()}</span>
        <a href={`mailto:${m.email()}`} class="text-green-900 underline">{m.faq_subtitle_link()}</a><span
          >{m.faq_subtitle_suffix()}</span
        >
      </p>
    </div>

    <ul role="list" class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
      {#each faqs as faq}
        <li>
          <h3 class="text-lg leading-6 font-semibold text-green-900">
            {faq.question}
          </h3>
          <p class="mt-4 text-sm whitespace-pre-line text-green-700">
            {faq.answer}
          </p>
        </li>
      {/each}
    </ul>
  </Container>
</section>
