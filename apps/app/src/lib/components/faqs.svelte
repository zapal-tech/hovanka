<script lang="ts">
  // filepath: /home/bohdan-kucheriavyi/Documents/Repositories/Zapal/hovanka-site/src/lib/components/Faqs.svelte
  import * as m from '$lib/paraglide/messages'

  import Container from './container.svelte'

  interface Faq {
    question: string
    answer: string
  }

  const faqs: Faq[][] = [
    // [
    //   {
    //     question: 'How do I know the tips are good?',
    //     answer:
    //       "Our whole business depends on our tips being good, so it's in our best interest that they are. The results of our customers speak for themselves, just trust us.",
    //   },
    //   {
    //     question: "Isn't this insider trading?",
    //     answer:
    //       "Yes exactly. But at scale! Historically you could only make insider trades with knowledge from your direct network. Pocket brings you insider trading tips from people you don't even know.",
    //   },
    //   {
    //     question: "But isn't insider trading illegal?",
    //     answer:
    //       "Here's the thing: you're the one doing the insider trading, not us. We're just giving you the tips and some tools to make trades. We're not doing anything wrong here.",
    //   },
    // ],
    // [
    //   {
    //     question: 'Do the people giving you tips realize what they are doing?',
    //     answer:
    //       "Again I would argue this isn't really our responsibility. People make their own choices. If they don't research the consequences that's on them, not on us.",
    //   },
    //   {
    //     question: 'Where is Pocket based?',
    //     answer: "Let's just say it's not somewhere where the SEC is going to find us.",
    //   },
    //   {
    //     question: 'Is there any age limit to trading on Pocket?',
    //     answer:
    //       "For our free plan, the age limit is based on the minimum age to trade in your country of residence. Our VIP plan uses advanced transaction anonymization though, so you can use that plan even if you're 9 years old. Or a dog.",
    //   },
    // ],
    // [
    //   {
    //     question: 'How did you get this on the App Store?',
    //     answer:
    //       'Honestly we were surprised too, but eventually we found out that the app reviewer found the app so compelling they approved it just so they could use it themselves.',
    //   },
    //   {
    //     question: 'How do I explain the money I withdraw from Pocket to the IRS?',
    //     answer: 'This feels like one-hundred percent a you problem. Pocket is not responsible in any way for your tax returns.',
    //   },
    //   {
    //     question: 'How do I become an insider?',
    //     answer:
    //       "Contact us with some details about your industry and the type of access you have to apply for an insider account. Once approved, we'll send you a guide on collecting insider information without being detected at work.",
    //   },
    // ],
  ]
</script>

<section id="faqs" aria-labelledby="faqs-title" class="border-t border-green-200 py-20 sm:py-32">
  <Container>
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 id="faqs-title" class="text-3xl font-medium tracking-tight text-green-900">{m.faq_title()}</h2>
      <p class="mt-2 text-lg text-green-600">
        <span>{m.faq_subtitle_prefix()}</span>
        <a href={`mailto:${m.email()}`} class="text-green-900 underline">{m.faq_subtitle_link()}</a><span
          >{m.faq_subtitle_suffix()}</span
        >
      </p>
    </div>
    <ul role="list" class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
      {#each faqs as column, columnIndex}
        <li>
          <ul role="list" class="space-y-10">
            {#each column as faq, faqIndex}
              <li>
                <h3 class="text-lg leading-6 font-semibold text-green-900">
                  {faq.question}
                </h3>
                <p class="mt-4 text-sm text-green-700">
                  {faq.answer}
                </p>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </Container>
</section>
