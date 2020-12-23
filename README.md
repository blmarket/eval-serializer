Eval-serializer
---------------

Easier to write serializations

### Problem

You have tons of big configuration blob and want to have some good syntax on
it. Usually it's not well supported for most of applications. I see visual studio 
provides great configuration with [autocomplete feature](1), but it was
burdensome for individual developer who wants to minimize requirements.

[1]: https://code.visualstudio.com/docs/languages/json

### Solution

This project leverage JavaScript code evaluation(`eval`, but with some
sandboxing), to allow configuration to be written in plain javascript syntax.
By providing serialization method, this library allows to serialize/deserialize
your configuration into well formatted JavaScript code. It's even possible to
implement some code inside your configuration.

### Caveats

Big disclaimer: Even though it tries its best to sandbox the eval context, it's
always possible that there's a security risk I missed to address. Only use this
library when the configuration cannot be modified by 3rd party.

Small caveat: Even though this library is written in TypeScript and supports
type definitions, it does not support serializing data into TypeScript format.

### Usage

You need to decorate all the classes which occurs in your 
serialization.

```
import * as ES from "eval-serializer";
class Foo { ... };
// Expect instance of `Foo` can be created via `new Foo(param1, param2)`
ES.decorate(Foo, (obj) => [ obj.param1, obj.param2 ] );
console.log(ES.toString(new Foo("p1", "p2")));
```

```
const serialized = '...';
const obj = new Function('Foo', serialized)(Foo); // generates original object
```

### TODO

#### Type helpers

I'd like to see IDE to suggest type informations.

Example: Serializer generates `.ts` file with type reference link, 
and provide `.d.ts` file which contains type informations.
