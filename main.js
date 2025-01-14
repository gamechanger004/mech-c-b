//icon
document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloat = document.getElementById('whatsapp-float');

    let isDragging = false;
    let startX, startY, initialX, initialY, dragThreshold = 5;

    whatsappFloat.addEventListener('mousedown', startDrag);
    whatsappFloat.addEventListener('touchstart', startDrag, {passive: false});

    function startDrag(e) {
        e.preventDefault();
        isDragging = false; // Reset dragging flag at the start

        if (e.type === 'mousedown' || (e.type === 'touchstart' && e.touches.length === 1)) {
            startX = e.clientX || e.touches[0].clientX;
            startY = e.clientY || e.touches[0].clientY;
            const rect = whatsappFloat.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;

            whatsappFloat.style.cursor = 'grabbing';
            whatsappFloat.style.transition = 'none';

            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, {passive: false});
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchend', endDrag);
        }
    }

    function drag(e) {
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        const dx = clientX - startX;
        const dy = clientY - startY;

        // Set isDragging to true only if the movement exceeds a small threshold (to distinguish from click)
        if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
            isDragging = true;
            whatsappFloat.style.left = `${initialX + dx}px`;
            whatsappFloat.style.top = `${initialY + dy}px`;
            whatsappFloat.style.bottom = 'auto';
            whatsappFloat.style.right = 'auto';
        }
    }

    function endDrag(e) {
        whatsappFloat.style.cursor = 'pointer';
        whatsappFloat.style.transition = '';
        
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);

        // Redirect to WhatsApp if no dragging occurred
        if (!isDragging) {
            window.open('https://wa.me/+971502297989', '_blank');
        }
    }
});