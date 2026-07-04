import { Shell } from '@/components/Shell';

export default function NewTransaction() {
  return (
    <Shell active="new">
      <div className="topbar"><div><div className="eyebrow">New Transaction</div><h1>Create the transaction container.</h1></div></div>
      <section className="card form-stack" style={{maxWidth: 760}}>
        <label>Transaction Type<select><option>Buyer Offer</option><option>Listing</option><option>Builder / New Construction</option><option>Investment Purchase</option></select></label>
        <label>Property Address<input placeholder="2948 E Alderann St, St. George, UT 84790" /></label>
        <label>Buyer(s)<input placeholder="Buyer legal names" /></label>
        <label>Seller<input placeholder="Seller legal name or entity" /></label>
        <label>Representation<select><option>Buyer represented by us</option><option>Seller represented by us / Buyer unrepresented</option><option>Limited agency</option></select></label>
        <div className="button-row"><a className="btn btn-primary" href="/transactions/txn-demo">Create Transaction</a><button className="btn">Save Draft</button></div>
      </section>
    </Shell>
  );
}
