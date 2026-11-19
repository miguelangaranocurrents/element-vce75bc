/*
 * Copyright 2026 Element Creations Ltd.
 *
 * SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
 * Please see LICENSE files in the repository root for full details.
 */

// @vitest-environment happy-dom

import { describe, it, expect } from "vitest";

import { setUpCommandTest } from "./__mocks__";

describe("/spoiler", () => {
    const roomId = "!room:example.com";

    it("should wrap the message in a spoiler and render its markdown", async () => {
        const { client, command } = setUpCommandTest(roomId, "/spoiler");

        const result = await command.run(client, roomId, null, "the **secret** plan").promise;

        expect(result.body).toBe("the **secret** plan");
        expect(result.formatted_body).toContain("<span data-mx-spoiler>");
        expect(result.formatted_body).toContain("<strong>secret</strong>");
    });
});
