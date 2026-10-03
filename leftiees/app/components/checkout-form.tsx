"use client";

import { useState } from "react";

import type { CustomerDetails } from "@/lib/order";

import TextField from "./text-field";

export default function CheckoutForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (details: CustomerDetails) => void;
  submitting: boolean;
}) {
  const [details, setDetails] = useState<CustomerDetails>({
    fullName: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    address: "",
    city: "",
    province: "",
    country: "Pakistan",
  });

  function update<K extends keyof CustomerDetails>(
    key: K,
    value: string,
  ) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(details);
      }}
      className="flex flex-col gap-8"
    >
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Customer information</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            id="fullName"
            label="Full name"
            autoComplete="name"
            required
            value={details.fullName}
            onChange={(event) => update("fullName", event.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={details.email}
            onChange={(event) => update("email", event.target.value)}
          />
          <TextField
            id="phone"
            label="Primary phone"
            type="tel"
            autoComplete="tel"
            required
            value={details.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
          <TextField
            id="secondaryPhone"
            label="Secondary phone (optional)"
            type="tel"
            value={details.secondaryPhone ?? ""}
            onChange={(event) => update("secondaryPhone", event.target.value)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Shipping address</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField
              id="address"
              label="Complete address"
              autoComplete="street-address"
              required
              value={details.address}
              onChange={(event) => update("address", event.target.value)}
            />
          </div>
          <TextField
            id="city"
            label="City"
            autoComplete="address-level2"
            required
            value={details.city}
            onChange={(event) => update("city", event.target.value)}
          />
          <TextField
            id="province"
            label="Province"
            autoComplete="address-level1"
            required
            value={details.province}
            onChange={(event) => update("province", event.target.value)}
          />
          <TextField
            id="country"
            label="Country"
            autoComplete="country-name"
            required
            value={details.country}
            onChange={(event) => update("country", event.target.value)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Payment method</h2>
        <div className="flex items-center gap-3 rounded-xl border border-black/15 px-4 py-3">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-denim">
            <span className="h-2.5 w-2.5 rounded-full bg-denim" />
          </span>
          <span className="text-sm font-medium">Cash on Delivery (COD)</span>
        </div>
      </section>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Placing order..." : "Place Order — Cash on Delivery"}
      </button>
    </form>
  );
}
