// Cursor Personalizado
document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-dot-outline");

    // Mostrar cursor
    cursorDot.style.opacity = "1";
    cursorOutline.style.opacity = "1";

    // Atualizar posição do cursor
    window.addEventListener("mousemove", (e) => {
        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top = e.clientY + "px";
        cursorOutline.style.left = e.clientX + "px";
        cursorOutline.style.top = e.clientY + "px";
    });

    // Adicionar efeito de hover em links e botões
    const handleMouseEnter = () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(0.8)";
        cursorOutline.style.transform = "translate(-50%, -50%) scale(3.5)";
        cursorOutline.style.backgroundColor = "rgba(0, 163, 255, 0.1)";
        cursorOutline.style.borderWidth = "0.1px";
    };

    const handleMouseLeave = () => {
        cursorDot.style.transform = "translate(-50%, -50%)";
        cursorOutline.style.transform = "translate(-50%, -50%)";
        cursorOutline.style.backgroundColor = "transparent";
        cursorOutline.style.borderWidth = "0.1px";
    };

    // Aplicar em todos os links e botões
    document.querySelectorAll("a, button").forEach(element => {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
    });
});
