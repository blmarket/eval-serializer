Eval-serializer
---------------

Easier to write serializations

### Problem

Most serialization formats are harder to write by human.
So far YAML might be the best serialization format to human, 
I wanted something little bit more easier than it.

### Solution

Serializer generates eval-able code which yields object.
So we can use various JS features to create object 
(Class, macro function, etc.)

### Usage

You need to decorate all the classes which occurs in your 
serialization.

```
import * as ES from "eval-serializer";
class Foo { ... };
ES.decorate(Foo, function(obj) => [ obj.param1, obj.param2 ] ); // constructor arguments which can recreate same object
console.log(ES.toString(new Foo("p1", "p2")));
```

```
const serialized = '...';
const obj = new Function('Foo', serialized)(Foo); // generates original object
```
