export type GuideLanguage = "ar" | "en";

type GuideSection = { heading: string; paragraphs: string[] };

const english: GuideSection[] = [
  {
    heading: "What is an audience response system?",
    paragraphs: [
      "An audience response system is a set of tools that lets people answer questions during a class, workshop, presentation, meeting, or event. Participants usually respond from a phone or browser, while the facilitator sees an aggregate view in real time. The system can support polls, quizzes, open-text prompts, confidence checks, and short surveys.",
      "The important idea is not the novelty of clicking a button. It is the feedback loop: ask a focused question, collect a response, interpret the pattern, and decide what to do next. A useful audience response system shortens the distance between what a presenter assumes and what a group actually understands or needs.",
    ],
  },
  {
    heading: "Why teams and educators use them",
    paragraphs: [
      "A live audience often looks attentive even when people are confused, unconvinced, or reluctant to speak. Anonymous or low-friction responses create another channel for participation. A teacher can check whether a concept is understood before moving on. A workshop leader can identify the most important concern in the room. A product team can compare priorities before spending time on implementation.",
      "Response systems are also useful for inclusion. Speaking in a large room can carry social cost, while a short digital response gives people time to think. That does not make the digital channel automatically representative: people may lack a device, connection, language support, or confidence in how their response will be used. The facilitator still needs to design the session responsibly.",
    ],
  },
  {
    heading: "Common response formats",
    paragraphs: [
      "Multiple-choice questions are useful when the facilitator needs a quick distribution across known options. Scales work well for confidence, agreement, satisfaction, or readiness. Word clouds can surface vocabulary, but they should be treated as a starting point rather than a rigorous ranking. Open-text responses reveal nuance and unexpected concerns, although they take longer to review.",
      "A good session varies the format only when the change serves a purpose. Too many interactions can make an event feel like a sequence of interruptions. Start with one question that establishes context, add a diagnostic question when a decision depends on understanding, and finish with an action-oriented prompt. Keep the wording concrete and avoid asking for information that the group does not need to share.",
    ],
  },
  {
    heading: "How to design a strong question",
    paragraphs: [
      "Write the question around one decision or learning objective. Avoid combining two ideas in one prompt, such as asking whether a proposal is both useful and affordable. State the response window and explain whether participants should choose one answer or several. If the question has a correct answer, say whether it is a knowledge check or a vote; those activities require different interpretation.",
      "The response options should cover the realistic possibilities without leading the audience toward the answer the facilitator prefers. Include an option such as “not sure” when uncertainty is meaningful. For sensitive topics, explain whether responses are anonymous, who can see them, and how long they will be retained. Trust is part of question design, not a footer added after the poll.",
    ],
  },
  {
    heading: "Privacy and consent considerations",
    paragraphs: [
      "An audience response system can collect more than the visible answer. Depending on its configuration, it may record an email address, account identity, device information, location, timestamps, or a link between a person and a response. Before choosing a tool, document the minimum data required for the session and disable collection that does not serve a clear purpose.",
      "Tell participants what is collected and what is not. If the activity is optional, provide a non-digital alternative. Do not describe a response as anonymous if administrators can connect it to a participant. For minors, employees, research subjects, or regulated contexts, obtain the approvals and notices required by the relevant policy. A short, accurate explanation is more valuable than a broad privacy promise.",
    ],
  },
  {
    heading: "Accessibility and language support",
    paragraphs: [
      "Make the interaction work with keyboard navigation, screen readers, zoom, and a small phone screen. Do not use color alone to communicate whether an answer is correct. Give controls clear labels and enough time for people who type slowly or use assistive technology. Test the participant flow on the devices that the audience actually uses rather than assuming a desktop-first experience will translate well.",
      "Language matters as much as layout. Translate the question, response options, instructions, and error states together. Support right-to-left scripts where needed, and check mixed-language numbers and punctuation. If a term could be interpreted differently across languages, add a short explanation instead of relying on a literal translation.",
    ],
  },
  {
    heading: "Reading the results responsibly",
    paragraphs: [
      "A response chart describes the people who responded, not necessarily everyone who was invited. Note the response count, the question wording, the time window, and any access limitations before drawing a conclusion. A high percentage can be misleading when only a small or self-selected group answered. Compare results over time only when the question and audience are sufficiently consistent.",
      "Use the result to choose a next step, not to manufacture certainty. Ask whether the pattern requires a follow-up question, a change in the material, a private conversation, or no action. When presenting the result back to the group, show uncertainty and explain what will happen next. Closing the loop builds more trust than displaying a colorful chart and moving on.",
    ],
  },
  {
    heading: "A practical implementation checklist",
    paragraphs: [
      "Before the session, define the objective, choose the smallest useful data set, test the participant link, prepare an accessible alternative, and decide who can view the results. During the session, explain the rules, ask one clear question at a time, watch for technical barriers, and pause when the response reveals confusion. Afterward, export only what the team needs, record the interpretation and action, and delete temporary response data according to the stated retention policy.",
      "The best audience response system is the one that supports a thoughtful conversation without becoming the conversation. Start with a small pilot, collect feedback from both participants and facilitators, and improve the wording, timing, and privacy explanation before adding more question types. Reliable basics usually create more value than a long list of flashy interactions.",
    ],
  },
];

const arabic: GuideSection[] = [
  {
    heading: "ما هي أنظمة استجابة الجمهور؟",
    paragraphs: [
      "أنظمة استجابة الجمهور هي أدوات تسمح للمشاركين بالإجابة عن أسئلة أثناء درس أو ورشة أو عرض أو اجتماع. يجيب المشاركون عادةً من الهاتف أو المتصفح، بينما يرى الميسّر نتيجة مجمعة في الوقت الحقيقي. قد تشمل الأنظمة استطلاعات قصيرة، وأسئلة اختيار من متعدد، وإجابات نصية، وقياس مستوى الثقة.",
      "الفكرة الأهم هي حلقة التغذية الراجعة: سؤال واضح، ثم إجابة، ثم فهم للنمط، ثم قرار عملي. النظام الجيد يقلل المسافة بين ما يظنه مقدم العرض وما يفهمه الجمهور أو يحتاج إليه فعلياً.",
    ],
  },
  {
    heading: "متى تكون مفيدة؟",
    paragraphs: [
      "قد يبدو الجمهور منتبهاً رغم وجود ارتباك أو تردد أو صعوبة في الكلام أمام الآخرين. تمنح الإجابة الرقمية القصيرة قناة إضافية للمشاركة، لكنها لا تضمن وحدها تمثيل الجميع. يجب مراعاة توفر الأجهزة والاتصال واللغة والثقة في طريقة استخدام الإجابات.",
      "ابدأ بسؤال يخدم هدفاً محدداً، واشرح هل الإجابة مجهولة ومن يستطيع رؤيتها ومدة الاحتفاظ بها. وضوح هذه التفاصيل جزء من تصميم التجربة وليس ملاحظة ثانوية.",
    ],
  },
  {
    heading: "الخصوصية وإتاحة الوصول",
    paragraphs: [
      "قد يجمع النظام عنوان البريد أو هوية الحساب أو معلومات الجهاز أو وقت الإجابة، إضافة إلى نص الإجابة نفسها. اجمع الحد الأدنى اللازم فقط، ووفّر بديلاً غير رقمي عند الحاجة. يجب أن تعمل التجربة مع لوحة المفاتيح وقارئ الشاشة والشاشات الصغيرة، وأن تدعم العربية واتجاه RTL بوضوح.",
    ],
  },
  {
    heading: "قائمة تنفيذ مختصرة",
    paragraphs: [
      "قبل الجلسة حدّد الهدف، واختبر الرابط، وجهّز بديلاً متاحاً، وقرّر من يرى النتائج. أثناء الجلسة اطرح سؤالاً واحداً في كل مرة وراقب العوائق التقنية. بعد الجلسة احتفظ بما تحتاجه فقط، وثّق القرار، واحذف البيانات المؤقتة وفق سياسة الاحتفاظ المعلنة. ابدأ بتجربة صغيرة قبل إضافة مؤثرات أو أنواع أسئلة كثيرة.",
    ],
  },
];

export const guideContent: Record<GuideLanguage, GuideSection[]> = { ar: arabic, en: english };
