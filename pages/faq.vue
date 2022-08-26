<template>
  <v-container>
    <h1>FAQs</h1>
    <v-row v-for="(q, idx) in faq" :key="idx" class="my-3" no-gutters>
      <h3>Q. {{ q.question }}</h3>
      <p v-for="(a, idx) in q.answer" :key="Math.random()">{{ a }}</p>
      <ul v-if="q.points">
        <li v-for="(p, idx) in q.points" :key="Math.random()">{{ p }}</li>
      </ul>
      <p v-for="(f, idx) in q.followup" v-if="q.followup" :key="Math.random()">{{ f }}</p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "faq",
  data: () => ({
    faq: [
      {
        question: "What types of scholarships are available?",
        answer: ["Ans. There are a huge range of scholarship opportunities available for university students across the world, ranging from partial scholarships which cover some tuition fees, to full scholarships which cover the duration of your studies. The majority of scholarships cover tuition fees only, leaving students to cover their own living costs.", "There are also many different types of scholarships for international students from certain regions, or even students studying in a certain field. For instance, many students from developing countries, including parts of Africa, Asia, Latin America and Eastern Europe, can apply for specific scholarships, as can many students from all over the world looking to study in a STEM-related field (science, technology, engineering and mathematics)."]
      },
      {
        question: "What are my chances of gaining a scholarship?",
        answer: ["Ans. Don’t be fooled, scholarships are highly competitive. After all, there are many students around the world trying to get funding for their studies. Although some scholarships depend on outstanding academic records (‘merit-based scholarships’), your chances of success are often determined by the quality of your application, and whether or not you are in financial need. A number of universities in the US, including Harvard and MIT for example, offer ‘need-blind’ admissions policies, meaning that all students’ applications are considered regardless of their financial situation, with tuition fees then covered at least partly by the school.", "There are a number of things you can do to improve your chances of gaining a scholarship. When applying for scholarships, you should make sure to include all the documentation requested, and dedicate plenty of time to writing your application. In particular, it’s important to clearly communicate your motivations for studying and how gaining a scholarship will support your ambitions. Stay within the deadlines and, most importantly, show the scholarship providers you have the potential to do great things!"]
      },
      {
        question: "Can I get a scholarship for graduate study?",
        answer: ["Ans. Yes! In fact, graduate scholarships to study abroad tend to be even more common than undergraduate scholarships, due to the fact that universities and governments are often keen to attract highly skilled graduate students, often using graduate scholarships as an incentive.", "Dependent on your level of study, there will be different opportunities available. While some scholarship schemes are open to all students, there are also dedicated master’s scholarships, PhD scholarships, postdoctoral scholarships and academic research scholarships. See the next question for information on where to find scholarships."]
      },
      {
        question: "Where do I go to find scholarship opportunities?",
        answer: ["Ans. To find scholarships you are eligible for, it is advised to first look at the information provided by your chosen university. Funding information will be listed on the university’s website or in the prospectus, and this is also where you’ll find the relevant contact information should you have any questions about scholarship applications.", "In many cases you will not be able to apply for university scholarships until you have gained acceptance onto a program at the university. If you are relying on a scholarship for funding, please see question five below.", "As well as university scholarships (funded by your university), there may also be a range of external scholarships you can apply for, such as government scholarships or scholarships funded by organizations or charities with an invested interest in higher education."]
      },
      {
        question: "Can I apply for a scholarship before being accepted into a university?",
        answer: ["Ans. If you’re relying on scholarship funding in order to be able to study, you should let the school in question know of your situation. Some schools offer only ‘fully funded’ places, meaning all applicants must have sufficient funding in place. But many allow you to apply to a program before gaining scholarships, on the understanding that you let them know as soon as possible if you have to reject the place due to lack of funding . If you do not get the scholarship, you should still have time to withdraw your university application or find an alternative method of funding before the start of term."]
      },
      {
        question: "How do I apply for international scholarships?",
        answer: ["Ans. In most cases, schools, governments and external organizations will list their scholarship opportunities online, with details of how to apply found alongside these listings. Most will allow you to submit your application online, accompanied by any supporting documentation you are asked to provide (see below).", "In rarer cases, the scholarship provider will specify an address for you to send your application in a printed format. If you have any specific queries about applying for scholarships, contact the provider using the contact information found on official websites."]
      },
      {
        question: "How do I know if I am eligible to apply?",
        answer: ["Ans. You will know if you are eligible to apply for a particular scholarship by reading the details on eligibility found on the provider’s website. Eligibility may depend on nationality, if the scholarship in question is targeted at students from specific regions. For subject-specific scholarships, the program you are enrolling on will also affect your eligibility.", "In most cases, university scholarships are only open to students who have already been accepted onto a program at that particular university. Government scholarships will also have designated funds for domestic students, as well as separate funds for international students – so make sure you have found the correct scholarship scheme before applying.", "Other common eligibility requirements include good grades at prior level of study, a degree from a reputed university (for graduate scholarships), and proficiency in English (e.g. TOEFL/IELTS, for English-language programs)."]
      },
      {
        question: "What should I submit with my scholarship application?",
        answer: ["Ans. As well as a completed application form, which will include information about yourself and your contact details, you may also be asked to provide the following documentation to support your application:"],
        points: ["A transcript of grades", "Letter(s) of recommendation", "An essay on a given topic"],
        followup: ["For some ‘need-based’ university scholarships in the US, applicants will also be asked to submit a ‘Free Application for Federal Student Aid’ (FAFSA) to establish whether they are in need of financial aid."]
      }]
  })
}
</script>
