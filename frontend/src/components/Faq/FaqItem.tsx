import FaqItem from "./Faq";

const Faq = () => {
  const faq = [
    {
      id: "0",
      question: "What is UltronicMart?",
      answer:
        "UltronicMart is an e-commerce platform where you can find a wide range of products, from electronics to daily essentials. We aim to provide a seamless shopping experience with fast delivery and reliable customer support.",
    },
    {
      id: "1",
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on your location. You can view these details during the checkout process.",
    },
    {
      id: "2",
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We use industry-standard encryption and security measures to protect your personal information. For more details, visit our Privacy Policy page.",
    },
    {
      id: "3",
      question: "How do I create an account?",
      answer:
        "Creating an account on UltronicMart is simple. You need to click on the 'Sign Up' button on the top-right corner of the homepage and fill in your details, such as your name, email address, and password. Once you submit your information, you will receive a verification email. After verifying your email, your account will be ready to use, and you can start shopping immediately.",
    },
    {
      id: "4",
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods, including credit and debit cards (Visa, MasterCard, American Express), PayPal, digital wallets like Google Pay and Apple Pay, as well as UltronicMart gift cards. This range of options ensures that you can pay conveniently and securely.",
    },
    {
      id: "5",
      question: "What is the return policy?",
      answer:
        "Our return policy allows you to return most products within 30 days of purchase. The items must be unused and in their original packaging to qualify for a return. If you want to initiate a return, simply visit the 'Returns & Refunds' section in your account and follow the instructions. However, please note that some items, such as perishable goods or personalized items, may not be eligible for return.",
    },
    {
      id: "6",
      question:
        "How do I contact customer support?",
      answer:
        "You can contact our customer support team through multiple channels. You can email us at support@ultronicmart.com, call us at +1-800-555-1234, or use our live chat feature, which is available 24/7 on our website. Our team is dedicated to assisting you with any inquiries or issues you may have.",
    },
    {
      id: "7",
      question: "Are there any fees for staking?",
      answer:
        "There might be small transaction fees for staking, as it involves interacting with the blockchain. These fees vary depending on the network you are using. Ensure you have enough tokens to cover gas fees.",
    },
    {
      id: "8",
      question: "Can I change or cancel my order?",
      answer:
        "If your order hasn’t been processed yet, you can change or cancel it by going to the 'My Orders' section in your account. Once you locate your order, you can select the edit or cancel option. However, if your order has already been shipped, you may need to wait until it arrives and then initiate a return.",
    },
  
  ];
  const halfLength = Math.floor(faq.length / 2);

  return (
    <section>
      <div id="faq" className="relative">
        <div className="container relative z-2 py-10">
          <h2 className="text-center pb-8 text-2xl lg:text-3xl font-bold my-10">
            Frequently Asked Questions
          </h2>
          <div className="faq-glow_before relative z-2 border-2 px-4 rounded-2xl">
            <div className="container flex gap-10 max-lg:block">
              <div className="rounded-half absolute -top-10 left-[calc(50%-40px)] z-4 flex size-20 items-center justify-center border-2 rounded-full">
                <img src="/ultronic_mart.png" alt="logo" className="size-1/1" />
              </div>

              <div className="relative flex-1 pt-10">
                {faq.slice(0, halfLength).map((item, index) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    index={index}
                    isBgColor={true}
                  />
                ))}
              </div>

              <div className="relative flex-1 lg:pt-10">
                {faq.slice(halfLength).map((item, index) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    index={halfLength + index}
                    isBgColor={true}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;