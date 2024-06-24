function ArrowScrollToTop() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button role="button" onClick={scrollToTop} className="border-none mr-5 float-right bg-bgYellow w-12 h-12 rounded-full pointer flex items-center justify-center text-xl hover:bg-buttonHover">
            <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="#000" fill="#000"><path d="m12 6.586-8.707 8.707 1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z" /></svg>
        </button>
    )
}
export default ArrowScrollToTop