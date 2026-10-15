// Copyright (c) 2026 Zach Metcalf. All Rights Reserved.

(function () {
	"use strict";

	const schemes = ["auto", "light", "dark"];
	const preference = window.matchMedia("(prefers-color-scheme: dark)");
	const stylesheet = document.getElementById("dark-css");
	let scheme = "auto";

	function applyScheme(value) {
		scheme = schemes.includes(value) ? value : "auto";
		const dark = scheme === "dark" || (scheme === "auto" && preference.matches);
		stylesheet.disabled = !dark;

		const button = document.getElementById("theme-toggle");
		if (button) {
			button.textContent = scheme;
		}
	}

	try {
		scheme = localStorage.getItem("color-scheme") || "auto";
	} catch {
	}

	applyScheme(scheme);

	document.addEventListener("DOMContentLoaded", function () {
		const button = document.getElementById("theme-toggle");
		if (!button) {
			return;
		}

		applyScheme(scheme);

		button.addEventListener("click", function () {
			const next = (schemes.indexOf(scheme) + 1) % schemes.length;
			applyScheme(schemes[next]);

			try {
				localStorage.setItem("color-scheme", scheme);
			} catch {
			}
		});
	});

	preference.addEventListener("change", function () {
		applyScheme(scheme);
	});

	window.addEventListener("storage", function (event) {
		if (event.key === "color-scheme" || event.key === null) {
			applyScheme(event.newValue);
		}
	});
})();
