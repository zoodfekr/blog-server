// تست سرور
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const SERVER_URL = 'http://localhost:5000';

async function testUserRegistration() {
    try {
        console.log('🧪 تست ثبت نام کاربر...');
        
        // ایجاد FormData
        const formData = new FormData();
        formData.append('username', 'testuser123');
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');
        
        // اضافه کردن فایل تصویر (اگر وجود داشت)
        const testImagePath = path.join(process.cwd(), 'public', 'files', 'images', 'test.jpg');
        if (fs.existsSync(testImagePath)) {
            formData.append('avatar', fs.createReadStream(testImagePath));
            console.log('✅ فایل تصویر اضافه شد');
        } else {
            console.log('⚠️ فایل تصویر یافت نشد، تست بدون آواتار');
        }
        
        // ارسال درخواست
        const response = await fetch(`${SERVER_URL}/users`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ ثبت نام موفق!');
            console.log('📊 پاسخ سرور:', data);
        } else {
            console.log('❌ خطا در ثبت نام');
            console.log('📊 پاسخ سرور:', data);
        }
        
    } catch (error) {
        console.error('❌ خطا در تست:', error.message);
    }
}

async function testGetUsers() {
    try {
        console.log('\n🧪 تست دریافت لیست کاربران...');
        
        const response = await fetch(`${SERVER_URL}/users`);
        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ دریافت لیست موفق!');
            console.log('📊 تعداد کاربران:', data.total);
            console.log('👥 کاربران:', data.data);
        } else {
            console.log('❌ خطا در دریافت لیست');
            console.log('📊 پاسخ سرور:', data);
        }
        
    } catch (error) {
        console.error('❌ خطا در تست:', error.message);
    }
}

async function testUserUpdate() {
    try {
        console.log('\n🧪 تست ویرایش کاربر...');
        
        // تست 1: آپدیت فقط ایمیل
        console.log('📝 تست آپدیت فقط ایمیل...');
        const emailUpdateForm = new FormData();
        emailUpdateForm.append('email', 'updated@example.com');
        
        let response = await fetch(`${SERVER_URL}/users/user/testuser123`, {
            method: 'PUT',
            body: emailUpdateForm
        });
        
        let data = await response.json();
        
        if (response.ok) {
            console.log('✅ آپدیت ایمیل موفق!');
            console.log('📊 پاسخ سرور:', data);
        } else {
            console.log('❌ خطا در آپدیت ایمیل');
            console.log('📊 پاسخ سرور:', data);
        }
        
        // تست 2: آپدیت با آواتار جدید
        console.log('\n📝 تست آپدیت با آواتار جدید...');
        const avatarUpdateForm = new FormData();
        avatarUpdateForm.append('username', 'newusername123');
        
        const testImagePath = path.join(process.cwd(), 'public', 'files', 'images', 'test.jpg');
        if (fs.existsSync(testImagePath)) {
            avatarUpdateForm.append('avatar', fs.createReadStream(testImagePath));
            console.log('✅ فایل تصویر جدید اضافه شد');
        }
        
        response = await fetch(`${SERVER_URL}/users/user/testuser123`, {
            method: 'PUT',
            body: avatarUpdateForm
        });
        
        data = await response.json();
        
        if (response.ok) {
            console.log('✅ آپدیت با آواتار جدید موفق!');
            console.log('📊 پاسخ سرور:', data);
        } else {
            console.log('❌ خطا در آپدیت با آواتار جدید');
            console.log('📊 پاسخ سرور:', data);
        }
        
    } catch (error) {
        console.error('❌ خطا در تست آپدیت:', error.message);
    }
}

// اجرای تست‌ها
async function runTests() {
    console.log('🚀 شروع تست‌های سرور...\n');
    
    await testUserRegistration();
    await testGetUsers();
    await testUserUpdate();
    
    console.log('\n🏁 پایان تست‌ها');
}

// اجرا اگر مستقیماً اجرا شود
if (import.meta.url === `file://${process.argv[1]}`) {
    runTests();
}

export { testUserRegistration, testGetUsers, testUserUpdate };

