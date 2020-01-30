import Head from 'next/head'

const Returns = ({config}) => (
  <div>
      <Head>
        <title>{`${config.title} - Return Policy`}</title>
        <meta name="description" content={`${config.title} - Return Policy`}></meta>
      </Head>
      <h1 className="title add-margin">Returns</h1>
      <div className="container add-margin">
         <br /> Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.
         <br />
         <br /> To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
         <br />
         <br /> Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.
         <br />
         <br /> Additional non-returnable items:
         <br /> - Gift cards
         <br /> - Downloadable software products
         <br /> - Some health and personal care items
         <br />
         <br /> To complete your return, we require a receipt or proof of purchase.
         <br /> Please do not send your purchase back to the manufacturer.
         <br />
         <br /> There are certain situations where only partial refunds are granted (if applicable)
         <br /> - Book with obvious signs of use
         <br /> - CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened
         <br /> - Any item not in its original condition, is damaged or missing parts for reasons not due to our error
         <br /> - Any item that is returned more than 30 days after delivery
         <br />
         <br /> <strong>Refunds (if applicable)</strong>
         <br /> Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
         <br /> If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
         <br />
         <br /> <strong>Late or missing refunds (if applicable)</strong>
         <br /> If you haven’t received a refund yet, first check your bank account again.
         <br /> Then contact your credit card company, it may take some time before your refund is officially posted.
         <br /> Next contact your bank. There is often some processing time before a refund is posted.
         <br />
         <br /> <strong>Sale items (if applicable)</strong>
         <br /> Only regular priced items may be refunded, unfortunately sale items cannot be refunded.
         <br />
         <br /> <strong>Gifts</strong>
         <br /> If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.
         <br />
         <br /> If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.
         <br />
         <br /> <strong>Shipping</strong>
         <br />You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
         <br />
         <br /> Depending on where you live, the time it may take for your exchanged product to reach you, may vary.
         <br />
         <br /> If you are shipping an item over $75, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.
      </div>

    <style jsx>{`
      .title {
        width: 100%;
        padding-top: 20px;
        line-height: 1.15;
        font-size: 48px;
        text-align: center;
      }
      .add-margin {
         margin: 20px auto 20px;
      }
    `}</style>
  </div>
)

export default Returns
