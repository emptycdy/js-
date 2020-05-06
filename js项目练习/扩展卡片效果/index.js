window.onload=function () {
    const panels=document.querySelectorAll('.panle');
    panels.forEach(panel=>{
        panel.addEventListener('click',()=>{
            removeActiveClasses();
            panel.classList.add('active');
        })
    })

    function removeActiveClasses() {
        panels.forEach(panel=>{
            panel.classList.remove('active');
        })
    }
}