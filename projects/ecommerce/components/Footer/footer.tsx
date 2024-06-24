
const Footer = () => {

  const date = new Date().getFullYear();
  return (
    <div id="footer" className="text-center w-full bg-secondary-background-blue p-10 flex absolute bottom-0">
      <span className="font-semibold text-sm text-textPrimary m-auto">Ecommerce - All Rights Reserved - {date}</span>
    </div>
  );
};
export default Footer;
