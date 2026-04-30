chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillForm') {
        fillMeeshoForm(request.data, request.delay);
    }
});

async function fillMeeshoForm(data, delay) {
    try {
        const productName = document.querySelector('input[placeholder*="Product name"], input[name*="name"]');
        const productPrice = document.querySelector('input[placeholder*="Price"], input[name*="price"]');
        const productDesc = document.querySelector('textarea[placeholder*="Description"], textarea[name*="description"]');
        const productStock = document.querySelector('input[placeholder*="Stock"], input[name*="stock"]');
        
        if (productName && data.name) {
            productName.value = data.name;
            productName.dispatchEvent(new Event('input', { bubbles: true }));
            await new Promise(r => setTimeout(r, delay / 2));
        }
        
        if (productPrice && data.price) {
            productPrice.value = data.price;
            productPrice.dispatchEvent(new Event('input', { bubbles: true }));
            await new Promise(r => setTimeout(r, delay / 2));
        }
        
        if (productDesc && data.description) {
            productDesc.value = data.description;
            productDesc.dispatchEvent(new Event('input', { bubbles: true }));
            await new Promise(r => setTimeout(r, delay / 2));
        }
        
        if (productStock && data.stock) {
            productStock.value = data.stock;
            productStock.dispatchEvent(new Event('input', { bubbles: true }));
            await new Promise(r => setTimeout(r, delay / 2));
        }
        
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.click();
            await new Promise(r => setTimeout(r, delay));
        }
        
        sendResponse({ success: true });
    } catch (error) {
        console.error('Error filling form:', error);
        sendResponse({ success: false, error: error.message });
    }
}
