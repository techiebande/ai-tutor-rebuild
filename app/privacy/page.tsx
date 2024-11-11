import React from "react";
import PageContainer from "@/components/PageContainer";
function page() {
  return (
    <section>
      <div className="bg-[#004E89] py-2 md:py-4 mb-5 sm:mb-10">
        <PageContainer>
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-gray-100 ">
              Privacy Policy
            </h1>
          </div>
        </PageContainer>
      </div>
      <PageContainer>
        <div className="mb-5 sm:mb-10 dark:text-gray-400">
          <p>
            Your privacy is important to us. This privacy policy explains the
            information that the WizdomCRM website (&quot;Site,&quot;
            &quot;we&quot;) collects, how we use it, and how you can access it.
          </p>

          <div className="mb-5 sm:mb-10 dark:text-gray-400">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
              Information We Collect
            </h1>
            <p>
              We collect personal information when you register on the site,
              including, but not limited to, your name, email address, and
              password.
            </p>
            <p>
              We also collect information about the messages you send through
              our site.
            </p>
          </div>
          <div className="mb-5 sm:mb-10 dark:text-gray-400">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
              How We Use the Information
            </h1>
            <p>
              We use the information we collect to provide, maintain, and
              improve our site, to develop new services, and to protect the site
              and our users.
            </p>
          </div>
          <div className="mb-5 sm:mb-10 dark:text-gray-400">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
              Sharing of Information
            </h1>
            <p>We do not sell your personal information to third parties.</p>
            <p>
              We may share your personal information with third parties only
              when (1) you give us permission to do so, (2) the information is
              provided to help complete a transaction for you, or (3) the
              information is provided to comply with the law, enforce our Terms
              and Conditions, or protect the rights, property, or safety of the
              Site, its users, or others.
            </p>
          </div>
          <div className="mb-5 sm:mb-10 dark:text-gray-400">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
              Access to Information
            </h1>
            <p>
              You can review and update the personal information you have
              provided to the Site by accessing and changing your account
              settings.
            </p>
          </div>
          <div className="mb-5 sm:mb-10 dark:text-gray-400">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4 mb-2 sm:mt-6 sm:mb-4">
              Changes to the Privacy Policy
            </h1>
            <p>
              WizdomCRM reserves the right to change this Privacy Policy at any
              time. Any changes will be posted on this page, so please review it
              periodically. Your continued use of the Site after the posting of
              any changes will constitute your acceptance of the changes.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

export default page;
