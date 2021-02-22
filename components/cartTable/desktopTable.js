import Link from "next/link";
import Image from "next/image";

const DesktopTable = props => {
  const { config, cart, remove, update, total, discountedTotal } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col" style={{ textAlign: "center" }}>
            Price
          </th>
          <th scope="col" style={{ textAlign: "center" }}>
            Quantity
          </th>
          <th
            scope="col"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, index) => {
          return (
            <tr key={`cart-item-${index}`}>
              <td style={{ display: "flex" }}>
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={`${config.products[item.number].assets}${
                      config.products[item.number].images[0]
                    }`}
                    alt="Product"
                    className="img-fluid cart-img"
                    layout="responsive"
                    width={200}
                    height={200}
                  />
                </Link>
                <div className="ml-3">
                  <Link href={`/product/${item.id}`}>
                    <h5 className="item-name">
                      {config.products[item.number].name}
                    </h5>
                  </Link>
                  <small className="remove-btn" onClick={() => remove(item)}>
                    Remove
                  </small>
                  <p className="mt-3" style={{ maxWidth: "400px" }}>
                    {config.products[item.number].description}
                  </p>
                </div>
              </td>
              <td>
                {item.quantity > 1 ? (
                  <div
                    className="mt-2"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center"
                    }}
                  >
                    <p>
                      <s>${config.products[item.number].price.toFixed(2)}</s>
                    </p>
                    <p style={{ marginLeft: "10px" }}>
                      $
                      {(
                        config.products[item.number].price -
                        config.products[item.number].price * item.discount
                      ).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p
                    className="mt-2"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    ${config.products[item.number].price}
                  </p>
                )}
              </td>
              <td>
                <form
                  onSubmit={event => update(event, item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <input
                    style={{
                      width: "50px",
                      fontSize: "medium",
                      marginRight: "10px",
                      textAlign: "center"
                    }}
                    name="quantity"
                    type="number"
                    defaultValue={item.quantity}
                    min={1}
                  />
                  <button className="submit-btn" type="submit">
                    Update
                  </button>
                </form>
              </td>
              <td>
                {item.quantity > 1 ? (
                  <div
                    className="mt-2"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "flex-end"
                    }}
                  >
                    <p>
                      <s>
                        $
                        {(
                          config.products[item.number].price * item.quantity
                        ).toFixed(2)}
                      </s>
                    </p>
                    <p style={{ marginLeft: "10px" }}>
                      $
                      {(
                        config.products[item.number].price * item.quantity -
                        config.products[item.number].price *
                          item.quantity *
                          item.discount
                      ).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p
                    className="mt-2"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    $
                    {(
                      config.products[item.number].price * item.quantity
                    ).toFixed(2)}
                  </p>
                )}
              </td>
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td>
            <h4>Subtotal:</h4>
          </td>
          <td colSpan={2}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end"
              }}
            >
              <h5>{total !== discountedTotal && <s>${total.toFixed(2)}</s>}</h5>
              <h5 style={{ marginLeft: "10px" }}>
                ${discountedTotal.toFixed(2)}
              </h5>
            </div>
          </td>
        </tr>
      </tbody>

      <style jsx>{`
        .cart-img {
          max-width: 200px;
        }
        .cart-img:hover {
          cursor: pointer;
        }
        .item-name:hover {
          cursor: pointer;
        }
        .remove-btn {
          border: 1px solid transparent;
          padding: 5px;
          border-bottom: 1px solid gray;
        }
        .remove-btn:hover {
          cursor: pointer;
          border: 1px solid gray;
        }
        .submit-btn {
          text-transform: uppercase;
          color: white;
          background-color: ${config.theme.color};
          font-size: small;
          font-weight: 600;
          text-align: center;
          width: 80px;
          padding: 5px;
          margin: 5px 5px 5px 0px;
          border: 0px;
        }
        s {
          color: red;
        }
        p {
          margin-bottom: 0px;
        }
      `}</style>
    </table>
  );
};

export default DesktopTable;
