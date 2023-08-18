<div dir="rtl">
<h1> مسار تطوير تطبيق تعقب النفقات</h1>
<p>الشيفرة المصدرية الخاصة تطوير تطبيق تعقب النفقات أخباري ضمن دورة "تطوير تطبيقات الويب باستخدام TypeScript" المقدمة من أكاديمية حسوب</p>

<div>
<a href=https://academy.hsoub.com/learn/php-web-application-development/">دورة تطوير تطبيقات الويب باستخدام PHP</a>
</div>

<h2> خطوات تشغيل التطبيق </h2>
<ul>
<li>تثبيت حزم جافاسكربت اللازمة <code>npm install</code></li>
<li>تشغيل فيت لبناء الأصول اللازمة <code>npm run dev</code></li>
<li>إضافة ملف <code>.env</code></li>
</ul>
</div>

 قاعدة البيانات المستخدمة هي <code>mongodb</code>
يحتوي على نموذجين <code>models</code> 

**نموذج المستخدم <code>User</code>:**
- اسم المستخدم (username)
- البريد الإلكتروني (email)
- كلمة المرور (password)
- تاريخ الإنشاء (createdAt)

**نموذج المعاملات <code>Transaction</code>:**
- المبلغ (amount)
- اسم (name)
- معرّف المستخدم (userId)
- تاريخ الإنشاء (createdAt)
