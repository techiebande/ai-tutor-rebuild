import React from "react";
import PageContainer from "@/components/PageContainer";
function page() {
  return (
    <div>
      <section>
        <div className="bg-[#004E89] py-2 md:py-4 mb-5 sm:mb-10">
          <PageContainer>
            <div>
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-100 ">
                Terms and Conditions
              </h1>
            </div>
          </PageContainer>
        </div>
        <PageContainer>
          <div className="mb-5 sm:mb-10 dark:text-gray-400">
            <p>
              These Terms and Conditions of Use (&quot;Terms&quot;) apply to the
              use of the WizdomCRM website (&quot;Site&quot;). By accessing and
              using the Site, you (&quot;User&quot;) agree to comply with these
              Terms.
            </p>
            <p>
              If you do not agree to these Terms, please do not use the Site.
            </p>
            <div className="mb-5 sm:mb-10 dark:text-gray-400">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
                Registration and Account Information
              </h1>
              <p>
                By registering on the Site, you agree to provide true, accurate,
                current, and complete information about yourself as requested in
                the registration form. If we believe the information is not
                true, accurate, current, or complete, we have the right to
                suspend or terminate your account and refuse any and all current
                or future use of the Site.
              </p>
            </div>
            <div className="mb-5 sm:mb-10 dark:text-gray-400">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
                Privacy and Personal Data Protection
              </h1>
              <p>
                All personal information we collect from you in connection with
                the use of the Site is treated in accordance with our Privacy
                Policy.
              </p>
              <p>
                The information you provide will be used to enable the
                functioning of the Site, including the exchange of messages with
                the WizdomCRM artificial intelligence.
              </p>
            </div>
            <div className="mb-5 sm:mb-10 dark:text-gray-400">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
                Site Use and User Conduct
              </h1>
              <p>
                You are responsible for all activity on your account. If you
                suspect unauthorized use of your account, please contact us
                immediately. We are not liable for any loss you may incur as a
                result of someone else using your password or account, with or
                without your knowledge.
              </p>
              <p>
                By sending messages through our Site, you agree not to send
                messages that: Infringe any copyright, patent, trademark, trade
                secret, or other proprietary rights of any party; <br />
                Are clearly offensive and/or promote racism, intolerance,
                hatred, or physical harm of any kind against any group or
                individual;Harass or advocate harassment of another person.
              </p>
            </div>
            <div className="mb-5 sm:mb-10 dark:text-gray-400">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
                Intellectual Property
              </h1>
              <p>
                Unless otherwise indicated, all content on the Site is the
                property of WizdomCRM and is protected by intellectual property
                laws.
              </p>
            </div>
            <div className="mb-5 sm:mb-10 dark:text-gray-400">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
                Changes to the Terms
              </h1>
              <p>
                WizdomCRM reserves the right to change these Terms at any time,
                and it is your responsibility to regularly review these Terms.
              </p>
              <p>
                Your continued use of the Site after the posting of any changes
                will constitute your acceptance of those changes.
              </p>
            </div>
            <div className="mb-5 sm:mb-10 dark:text-gray-400">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
                Acceptance of the Terms
              </h1>
              <p>
                By creating an account, you agree to all of these Terms. If you
                do not agree to any of these Terms, do not use this Site or any
                services offered by this Site.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>{" "}
    </div>
  );
}

export default page;
