# مكونات لوحة التحكم - دليل الاستخدام

## نظرة عامة

تم إنشاء ثلاثة مكونات رئيسية لواجهة لوحة التحكم:
- **Sidebar**: القائمة الجانبية القابلة للطي
- **TopBar**: شريط التنقل العلوي
- **PageWrapper**: غلاف الصفحة الذي يجمع المكونات معاً

## المكونات

### 1. AppContext

يدير حالة التطبيق العامة بما في ذلك:
- حالة الهاتف المحمول
- حالة فتح/إغلاق الشريط الجانبي
- حالة المصادقة

```tsx
import { useAppContext } from '@/Context/AppContext';

const MyComponent = () => {
  const { isMobile, isSidebarOpen, toggleSidebar, logout } = useAppContext();
  // استخدم القيم هنا
};
```

### 2. Sidebar (القائمة الجانبية)

**الميزات:**
- قابلة للطي والتوسيع
- تدعم العناصر الرئيسية والفرعية
- تلميحات الأدوات عند التصغير
- تصميم متجاوب للهاتف المحمول
- خلفية متدرجة جذابة

**العناصر المتاحة:**
- لوحة التحكم
- الطلاب
- المعلمون
- الفصول والمواد
- المهام
- التحليلات
- التواصل
- الإعدادات

**التخصيص:**
يمكنك تعديل `menuItems` في ملف `Sidebar.tsx` لإضافة أو إزالة عناصر القائمة.

### 3. TopBar (شريط التنقل العلوي)

**الميزات:**
- زر القائمة للهاتف المحمول
- عرض التاريخ الحالي بالعربية
- أيقونة الإشعارات مع دائرة التنبيه
- أيقونة الإعدادات
- تصميم متجاوب

### 4. PageWrapper (غلاف الصفحة)

**الاستخدام:**

```tsx
import PageWrapper from '@/Components/layout/PageWrapper/PageWrapper';

const MyPage = () => {
  return (
    <PageWrapper currentPage="Dashboard">
      <div className="p-6">
        {/* محتوى صفحتك هنا */}
      </div>
    </PageWrapper>
  );
};
```

**الخصائص:**
- `children`: محتوى الصفحة
- `showStaticBar`: إظهار/إخفاء الشريط الجانبي والعلوي (افتراضي: true)
- `currentPage`: اسم الصفحة الحالية لتفعيل العنصر في القائمة
- `currentSection`: القسم الحالي (اختياري)

## التثبيت والإعداد

### 1. التبعيات المثبتة:
- react-icons

### 2. الملفات المحدثة:
- `src/Context/AppContext.tsx` - إدارة حالة التطبيق
- `src/Components/layout/Sidebar/Sidebar.tsx` - القائمة الجانبية
- `src/Components/layout/TopBar/TopBar.tsx` - الشريط العلوي
- `src/Components/layout/PageWrapper/PageWrapper.tsx` - غلاف الصفحة
- `src/app/layout.tsx` - تضمين AppProvider
- `src/app/globals.css` - الأنماط العامة

## الاستخدام في الصفحات

### مثال: صفحة لوحة التحكم

```tsx
import PageWrapper from '@/Components/layout/PageWrapper/PageWrapper';

export default function DashboardPage() {
  return (
    <PageWrapper currentPage="Dashboard">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>
        {/* المحتوى */}
      </div>
    </PageWrapper>
  );
}
```

### مثال: صفحة الطلاب

```tsx
import PageWrapper from '@/Components/layout/PageWrapper/PageWrapper';

export default function StudentsPage() {
  return (
    <PageWrapper currentPage="Students">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">الطلاب</h1>
        {/* المحتوى */}
      </div>
    </PageWrapper>
  );
}
```

## التخصيص

### تغيير الألوان:
عدّل المتغيرات في `globals.css`:

```css
:root {
  --primary-color: #10b981; /* اللون الأساسي */
  --color-dark: #1f2937;    /* اللون الداكن */
  --semi-dark: #6b7280;     /* اللون شبه الداكن */
}
```

### إضافة عناصر قائمة جديدة:

في `Sidebar.tsx`، أضف إلى مصفوفة `menuItems`:

```tsx
{
  key: 'NewSection',
  icon: MdYourIcon,
  subItems: [
    { key: 'SubItem1', link: '/new-section/sub1' },
    { key: 'SubItem2', link: '/new-section/sub2' },
  ],
}
```

ثم أضف الترجمات في كائن `labels`:

```tsx
const labels: Record<string, string> = {
  // ... ترجمات موجودة
  NewSection: 'القسم الجديد',
  SubItem1: 'عنصر فرعي 1',
  SubItem2: 'عنصر فرعي 2',
};
```

## ملاحظات مهمة

1. **الخط المستخدم**: Noto Kufi Arabic - مدمج باستخدام Next.js Font Optimization
2. **الاتجاه**: RTL (من اليمين إلى اليسار)
3. **اللغة**: العربية فقط
4. **التجاوب**: متجاوب تماماً مع جميع أحجام الشاشات
5. **الأيقونات**: react-icons (Material Design Icons)

## الصور المطلوبة

تأكد من وضع الصور التالية في مجلد `public/Images/`:
- `logo.png` - شعار التطبيق

## المزيد من التطوير

يمكنك توسيع هذه المكونات بإضافة:
- صفحات إضافية
- عناصر قائمة جديدة
- وظائف البحث
- نظام الإشعارات الفعلي
- صفحة الإعدادات
- نظام المصادقة الكامل

## الدعم

للمزيد من المعلومات أو المساعدة، راجع التوثيق الرسمي لـ:
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React Icons: https://react-icons.github.io/react-icons/
