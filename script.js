/* MINECRAFT CONFESSION - STRICT BEHAVIOR */

document.addEventListener('DOMContentLoaded', () => {

    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    
    // Setup HUD icons (Hearts & Hunger)
    const heartsContainer = document.getElementById('hud-hearts');
    const hungerContainer = document.getElementById('hud-hunger');
    for (let i=0; i<10; i++) {
        let h = document.createElement('div');
        h.className = 'hud-icon icon-heart pixelated';
        heartsContainer.appendChild(h);
        
        let drum = document.createElement('div');
        drum.className = 'hud-icon icon-hunger pixelated';
        hungerContainer.appendChild(drum);
    }

    // "NO" button behavior: Evade mouse precisely on a grid
    const btnWidth = 200;
    const btnHeight = 40;
    const snapGrid = 20;

    btnNo.addEventListener('mousemove', (e) => {
        // Compute new position
        const bx = btnNo.getBoundingClientRect();
        
        let currentLeft = parseInt(btnNo.style.left) || bx.left;
        let currentTop = parseInt(btnNo.style.top) || 0; // Relative to the buttons container

        // Stepped snapping randomness
        let moveX = (Math.random() > 0.5 ? 1 : -1) * (100 + Math.floor(Math.random() * 4) * snapGrid);
        let moveY = (Math.random() > 0.5 ? 1 : -1) * (50 + Math.floor(Math.random() * 4) * snapGrid);

        btnNo.style.left = pxSnap(currentLeft + moveX) + 'px';
        btnNo.style.top = pxSnap(currentTop + moveY) + 'px';
    });
    
    // Ensure we snap things perfectly
    function pxSnap(val) {
        return Math.round(val / snapGrid) * snapGrid;
    }

    // "YES" button logic cascade
    btnYes.addEventListener('click', () => {
        // Step 1: Hide main container
        document.getElementById('main-container').classList.add('hidden');
        
        // Appear Chest
        const chestContainer = document.getElementById('chest-container');
        chestContainer.classList.remove('hidden');
        const chest = document.getElementById('chest');
        
        // Hard stepped timeout sequences instead of easing
        setTimeout(() => {
            // Step 2: Chest opens animation (top lid rotate)
            chest.classList.add('open');
            
            setTimeout(() => {
                // Step 3: Inventory UI Opens
                chestContainer.classList.add('hidden');
                document.getElementById('inventory-ui').classList.remove('hidden');
                
                // Step 4 & 5: Inventory slots appear one by one
                const slots = [
                    document.getElementById('slot-0'),
                    document.getElementById('slot-1'),
                    document.getElementById('slot-2'),
                    document.getElementById('slot-3'),
                    document.getElementById('slot-msg')
                ];
                
                let t = 0;
                slots.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.remove('hidden-item');
                    }, t);
                    t += 300; // 300ms hard steps
                });

                // Step 6: Setup tooltip
                const msgSlot = document.getElementById('slot-msg');
                const tooltip = document.getElementById('inv-tooltip');
                msgSlot.addEventListener('mouseenter', () => tooltip.classList.remove('hidden'));
                msgSlot.addEventListener('mouseleave', () => tooltip.classList.add('hidden'));

                // Step 7: Pig Walk & Step 8: Sunset
                setTimeout(() => {
                    document.body.classList.add('sunset-active');
                    const pig = document.getElementById('pig-walk');
                    pig.classList.remove('hidden');
                    
                    // Instead of CSS transition, use stepped interval
                    let pigX = -64;
                    const stopX = window.innerWidth;
                    const pigStep = setInterval(() => {
                        pigX += 8; // move 8px at a time
                        pig.style.left = pigX + 'px';
                        if (pigX > stopX) clearInterval(pigStep);
                    }, 50);

                    // Step 9: Floating Hearts
                    const pLayer = document.getElementById('particles-layer');
                    setInterval(() => {
                        const hr = document.createElement('div');
                        hr.className = 'float-heart pixelated';
                        hr.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
                        hr.style.bottom = '0px';
                        pLayer.appendChild(hr);

                        let yPos = 0;
                        const hrStep = setInterval(() => {
                            yPos += 4;
                            hr.style.bottom = yPos + 'px';
                            if (yPos > window.innerHeight) {
                                clearInterval(hrStep);
                                hr.remove();
                            }
                        }, 50);
                    }, 400);

                }, t + 800);

            }, 500);
        }, 800);
    });

    // Make hotbar selected item cycle randomly to mimic life
    const hbSel = document.getElementById('hotbar-selection');
    setInterval(() => {
        let slotIndex = Math.floor(Math.random() * 9);
        // Each slot is 20px wide in texture scale 2x = 40px
        hbSel.style.left = (Math.round((slotIndex * 40)) - 2) + 'px';
    }, 2000);

});
