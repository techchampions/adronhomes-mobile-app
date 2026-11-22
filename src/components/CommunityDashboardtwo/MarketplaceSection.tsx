import { ShoppingBag, Wallet } from "lucide-react";
import React, { useMemo, useState } from "react";
import { FiMinus, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import { useGetUserWalletdata } from "../../data/hooks";
import { formatDate } from "../../data/utils";
import {
  MarketOrderStatus,
  MarketProduct,
  useMarketplaceOrders,
  useMarketplaceProducts,
  usePlaceMarketplaceOrder,
} from "../../hooks/estateCommunity/useEstateCommunity";
import InlineLoading from "../InlineLoading";

const money = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const statusLabel: Record<MarketOrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
};

const statusClass: Record<MarketOrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  processing: "bg-sky-50 text-sky-700",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-600",
};

const MarketplaceSection: React.FC = () => {
  const context: CommunityOutletContext = useOutletContext();
  const estateId = context.data?.estate_info.id;
  const estateName = context.data?.estate_info.name;
  const [view, setView] = useState<"shop" | "orders">("shop");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<MarketProduct | null>(null);

  const productsQuery = useMarketplaceProducts(estateId);
  const ordersQuery = useMarketplaceOrders(view === "orders");
  const walletQuery = useGetUserWalletdata();
  const balance = Number(walletQuery.data?.wallet_balance || 0);
  const products = productsQuery.data?.data?.data || [];
  const orders = (ordersQuery.data?.data?.data || []).filter(
    (order) => order.estate_id === estateId
  );

  const categories = useMemo(() => {
    const names = new Set(products.map((product) => product.category).filter(Boolean));
    return ["All", ...names];
  }, [products]);

  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#79B833]">
            Estate shop
          </p>
          <h3 className="mt-1 text-2xl font-bold text-[#032147]">Marketplace</h3>
          <p className="mt-1 text-sm text-gray-500">
            Buy from {estateName || "your estate"} and pay with your wallet.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-[#79B833]/20 bg-[#79B833]/10 px-4 py-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#4F7E1D]">
            <Wallet className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs text-gray-500">Wallet balance</p>
            <p className="text-lg font-bold text-[#032147]">{money.format(balance)}</p>
          </div>
        </div>
      </div>

      <div className="flex w-fit rounded-full bg-gray-100 p-1">
        {(["shop", "orders"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setView(item)}
            className={`h-10 rounded-full px-5 text-sm font-semibold ${
              view === item ? "bg-[#032147] text-white" : "text-gray-500"
            }`}
          >
            {item === "shop" ? "Shop" : "My orders"}
          </button>
        ))}
      </div>

      {view === "shop" ? (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex h-11 flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-4">
              <FiSearch className="text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products"
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium ${
                  category === item
                    ? "bg-[#79B833] text-white"
                    : "bg-white text-gray-500 ring-1 ring-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {productsQuery.isLoading && <InlineLoading text="Loading products..." />}
          {productsQuery.isError && (
            <p className="text-sm text-red-600">Could not load the marketplace.</p>
          )}
          {!productsQuery.isLoading && !productsQuery.isError && visibleProducts.length === 0 && (
            <EmptyShop />
          )}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
              >
                <ProductImage product={product} />
                <div className="space-y-3 p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#79B833]">
                      {product.category}
                    </p>
                    <h4 className="mt-1 text-lg font-semibold text-[#032147]">
                      {product.name}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xl font-bold text-[#032147]">
                        {money.format(Number(product.price))}
                      </p>
                      <p className="text-xs text-gray-400">
                        {product.stock > 0 ? `${product.stock} in stock` : "Sold out"}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={product.stock < 1}
                      onClick={() => setSelected(product)}
                      className="h-10 rounded-full bg-[#79B833] px-4 text-sm font-semibold text-white disabled:bg-gray-200 disabled:text-gray-400"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <OrdersPanel
          loading={ordersQuery.isLoading}
          error={ordersQuery.isError}
          orders={orders}
        />
      )}

      {selected && (
        <CheckoutModal
          product={selected}
          balance={balance}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

function ProductImage({ product }: { product: MarketProduct }) {
  const [failed, setFailed] = useState(false);
  if (!product.picture || failed) {
    return (
      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[#032147] to-[#79B833] text-white">
        <ShoppingBag className="h-8 w-8" />
      </div>
    );
  }
  return (
    <img
      src={product.picture}
      alt={product.name}
      onError={() => setFailed(true)}
      className="h-44 w-full object-cover"
    />
  );
}

function EmptyShop() {
  return (
    <div className="rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
      <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-[#79B833]" />
      <p className="font-semibold text-[#032147]">Nothing in the shop yet</p>
      <p className="mt-1 text-sm text-gray-500">
        Products added for this estate will show up here.
      </p>
    </div>
  );
}

function OrdersPanel({
  loading,
  error,
  orders,
}: {
  loading: boolean;
  error: boolean;
  orders: {
    id: number;
    product_name: string;
    quantity: number;
    total_price: string | number;
    status: MarketOrderStatus;
    created_at: string;
  }[];
}) {
  if (loading) return <InlineLoading text="Loading orders..." />;
  if (error) return <p className="text-sm text-red-600">Could not load your orders.</p>;
  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center text-sm text-gray-500">
        You have not bought anything from this estate yet.
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <article
          key={order.id}
          className="flex flex-col justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-semibold text-[#032147]">{order.product_name}</p>
            <p className="mt-1 text-sm text-gray-500">
              {order.quantity} × {money.format(Number(order.total_price) / order.quantity)} ·{" "}
              {formatDate(order.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[order.status]}`}>
              {statusLabel[order.status]}
            </span>
            <p className="font-bold text-[#032147]">{money.format(Number(order.total_price))}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function CheckoutModal({
  product,
  balance,
  onClose,
}: {
  product: MarketProduct;
  balance: number;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [confirming, setConfirming] = useState(false);
  const { mutate, isPending } = usePlaceMarketplaceOrder();
  const price = Number(product.price) || 0;
  const total = price * quantity;
  const remaining = balance - total;
  const canBuy = quantity > 0 && quantity <= product.stock && remaining >= 0 && !isPending;

  const buy = () => {
    mutate(
      { productId: product.id, quantity },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white">
        <ProductImage product={product} />
        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#79B833]">
                Pay with wallet
              </p>
              <h4 className="mt-1 text-xl font-bold text-[#032147]">{product.name}</h4>
            </div>
            <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
              <FiX className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-500">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-gray-200"
              >
                <FiMinus />
              </button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-gray-200"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <Row label="Total" value={money.format(total)} />
            <Row label="Wallet balance" value={money.format(balance)} />
            <Row
              label="Balance after purchase"
              value={money.format(Math.max(remaining, 0))}
            />
          </div>
          {remaining < 0 && (
            <p className="text-sm text-red-600">
              Your wallet does not have enough for this order.
            </p>
          )}
          <button
            type="button"
            disabled={!canBuy}
            onClick={() => setConfirming(true)}
            className="h-12 w-full rounded-full bg-[#032147] text-sm font-semibold text-white disabled:bg-gray-200 disabled:text-gray-400"
          >
            {`Pay ${money.format(total)}`}
          </button>
        </div>
      </div>
      {confirming && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6">
            <h4 className="text-lg font-bold text-[#032147]">Confirm wallet payment</h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              If you continue, your wallet will be debited{" "}
              <span className="font-semibold text-[#032147]">{money.format(total)}</span>{" "}
              for {quantity} × {product.name}. The amount is taken from your wallet balance as soon as you confirm.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setConfirming(false)}
                className="h-11 flex-1 rounded-full border border-gray-200 text-sm font-semibold text-gray-600"
              >
                Go back
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={buy}
                className="h-11 flex-1 rounded-full bg-[#032147] text-sm font-semibold text-white disabled:bg-gray-300"
              >
                {isPending ? "Debiting..." : "Confirm and pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-[#032147]">{value}</span>
    </div>
  );
}

export default MarketplaceSection;
