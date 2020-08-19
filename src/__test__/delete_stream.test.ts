// import { v4 as uuid } from "uuid";

import * as eventstore from "../";
import { EventData, Revision } from "../types";
import {v4 as uuid} from "uuid";

describe("delete_stream", function () {
  it("should successfully delete a stream", async () => {
    const connection = eventstore.EventStoreConnection
        .builder()
        .sslDevMode()
        .build(
      "localhost:2113"
    );

    const streamName = `tombstone-${uuid()}`;
    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    await connection
        .streams()
        .writeEvents(streamName)
        .expectedVersion(Revision.Any)
        .send([evt])

    const result = await connection
        .streams()
        .tombstone(streamName)
        .execute();

    console.log(result);

    expect(1).toBe(1);
  });
});